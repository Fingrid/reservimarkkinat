"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useXmlSchemaStore } from "./xmlSchemaStore";
import { xmlRegisterInputProvider } from "libxml2-wasm";
import { StoreBackedInputProvider } from "../_utils/xml/StoreBackedInputProvider";
import { allSchemaConfigs } from "../_config/schemas.config";
import { validateXml } from "../_utils/xml/xmlValidator";
import { extractXMLNamespace } from "../_utils/xml/utils";
import { ValidationResult, SchemaInfo } from "@/types";

export type ValidatorState = {
  // Input state
  activeTab: "file" | "text";
  textInput: string;
  fileInput: File | null;
  fileContent: string;
  currentSchemaInfo: SchemaInfo | null;

  // Validation state
  isValidating: boolean;
  validationResults: ValidationResult | null;
  error: string | null;
  isXmlToolsInitialized: boolean;

  // Actions
  setActiveTab: (tab: "file" | "text") => void;
  setTextInput: (text: string) => void;
  setFileInput: (file: File | null) => void;
  setFileContent: (content: string) => void;
  initializeXmlTools: () => Promise<void>;
  validateInput: () => Promise<void>;
  reset: () => void;
};

// --- Initial State ---
const initialState = {
  activeTab: "file" as "file" | "text",
  textInput: "",
  fileInput: null,
  fileContent: "",
  currentSchemaInfo: null,
  isValidating: false,
  validationResults: null,
  error: null,
  isXmlToolsInitialized: false,
};

// --- Store Creator ---
export const useValidatorStore = create<ValidatorState>()(
  immer((set, get) => {
    // --- Helper Functions ---
    const _updateSchemaInfo = (content: string | null) => {
      if (!content) {
        return { urn: null, url: null };
      }
      const urn = extractXMLNamespace(content);
      const schemaItem = get().isXmlToolsInitialized
        ? useXmlSchemaStore.getState().getSchemaByUrn(urn)
        : undefined;
      return {
        urn: urn,
        url: schemaItem?.fileUrl ?? null,
      };
    };

    return {
      ...initialState,

      // --- Actions ---

      setActiveTab: (tab) => {
        set((state) => {
          state.activeTab = tab;
        });
      },

      setTextInput: (text) => {
        // Trigger initialization if needed, but don't wait
        void get().initializeXmlTools(); // Use void for fire-and-forget

        set((state) => {
          state.textInput = text;
          state.validationResults = null;
          state.error = null;
          state.currentSchemaInfo = _updateSchemaInfo(text);
          state.fileContent = text; // Keep fileContent consistent if text is source
        });
      },

      setFileInput: (file) => {
        set((state) => {
          state.fileInput = file;
          state.fileContent = ""; // Clear content when new file is selected
          state.validationResults = null;
          state.error = null;
          state.currentSchemaInfo = null;
        });
        // If a file is selected, read its content immediately
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const content = e.target?.result as string;
            get().setFileContent(content); // Use the action to set content and derive schema info
          };
          reader.onerror = (e) => {
            console.error("Failed to read file:", e);
            set((state) => {
              state.error = "Failed to read file.";
              state.fileContent = "";
              state.currentSchemaInfo = null;
            });
          };
          reader.readAsText(file);
        }
      },

      setFileContent: async (content) => {
        await get().initializeXmlTools();

        set((state) => {
          state.fileContent = content;
          state.currentSchemaInfo = _updateSchemaInfo(content);
        });
      },

      initializeXmlTools: async () => {
        if (
          // Initialization Guard
          get().isXmlToolsInitialized ||
          useXmlSchemaStore.getState().isLoading
        ) {
          return;
        }
        set((state) => {
          state.error = null;
        });

        try {
          // Ensure schema store is initialized first
          await useXmlSchemaStore
            .getState()
            .initializeSchemas(allSchemaConfigs);
          const schemaStoreError = useXmlSchemaStore.getState().error;
          if (schemaStoreError) {
            throw new Error(
              `Schema initialization failed: ${schemaStoreError}`,
            );
          }
          if (!useXmlSchemaStore.getState().isInitialized) {
            throw new Error(
              "Schema store failed to initialize but did not report an error.",
            );
          }

          // Register the input provider *after* schemas are loaded
          xmlRegisterInputProvider(
            new StoreBackedInputProvider(useXmlSchemaStore.getState()),
          );

          set((state) => {
            state.isXmlToolsInitialized = true;
            // Update currentSchemaInfo based on current content now that schemas are ready
            const content =
              state.activeTab === "text" ? state.textInput : state.fileContent;
            // Only update if URL was missing or content exists
            if (content && !state.currentSchemaInfo?.url) {
              state.currentSchemaInfo = _updateSchemaInfo(content);
            }
          });
        } catch (error) {
          console.error("Failed to initialize XML tools:", error);
          set((state) => {
            state.error = `Failed to initialize XML tools: ${error instanceof Error ? error.message : String(error)}`;
            state.isXmlToolsInitialized = false;
          });
        }
      },

      validateInput: async () => {
        set((state) => {
          state.isValidating = true;
          state.validationResults = null;
          state.error = null;
        });

        if (!get().isXmlToolsInitialized) {
          await get().initializeXmlTools();
          if (!get().isXmlToolsInitialized || get().error) {
            set((state) => {
              state.isValidating = false;

              state.error =
                state.error ??
                "XML validation environment could not be initialized.";
            });
            return;
          }
        }

        const { activeTab, textInput, fileContent } = get();
        const xmlContent = activeTab === "text" ? textInput : fileContent;

        if (!xmlContent) {
          set((state) => {
            state.isValidating = false;
            state.error = "No XML content to validate.";
          });
          return;
        }

        try {
          const result = await validateXml(xmlContent);
          set((state) => {
            state.validationResults = result;
            state.isValidating = false;
            state.error = null; 

            if (result.schema && !state.currentSchemaInfo?.url) {
              state.currentSchemaInfo = {
                urn: result.schema.urn,
                url: result.schema.url,
              };
            }
          });
        } catch (error) {
          console.error("Validation failed unexpectedly:", error);
          const errorMessage = `Validation failed: ${error instanceof Error ? error.message : "Unknown error"}`;
          set((state) => {
            state.validationResults = {
              isValid: false,
              details: [{ line: 0, message: errorMessage }],
            };
            state.error = errorMessage;
            state.isValidating = false;
          });
        }
      },

      reset: () => {
        set((state) => {
          Object.assign(state, initialState); // Reset to initial state
        });
      },
    };
  }),
);
