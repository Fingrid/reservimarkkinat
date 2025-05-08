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
import { Config } from "./configStore";

// Possible states
export type ValidatorStateStatus =
  | "not_initialized"
  | "initialized"
  | "content-ready"
  | "content-error"
  | "validating"
  | "validation-complete"
  | "server-validating"
  | "server-validation-complete"
  | "initialization-failed";

export type ValidatorState = {
  // Input state
  activeTab: "file" | "text";
  textInput: string;
  fileInput: File | null;
  fileContent: string;
  currentSchemaInfo: SchemaInfo | null;

  // Validation state
  status: ValidatorStateStatus;
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
  status: "not_initialized" as ValidatorStateStatus,
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

    // Helper to update status based on content and schema
    const _updateContentStatus = (
      content: string | null,
      schema: SchemaInfo | null,
    ) => {
      if (!content) {
        return "initialized";
      }
      if (schema?.urn && !schema?.url) {
        return "content-error";
      }
      return "content-ready";
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

          const schemaInfo = _updateSchemaInfo(text);
          state.currentSchemaInfo = schemaInfo;
          state.fileContent = text; // Keep fileContent consistent if text is source

          // Only update status if we're already initialized
          if (
            state.status !== "not_initialized" &&
            state.status !== "initialization-failed"
          ) {
            state.status = _updateContentStatus(text, schemaInfo);
          }
        });
      },

      setFileInput: (file) => {
        set((state) => {
          state.fileInput = file;
          state.fileContent = ""; // Clear content when new file is selected
          state.validationResults = null;
          state.error = null;
          state.currentSchemaInfo = null;

          // If we're clearing the file, revert to initialized state
          if (
            !file &&
            state.status !== "not_initialized" &&
            state.status !== "initialization-failed"
          ) {
            state.status = "initialized";
          }
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
              if (
                state.status !== "not_initialized" &&
                state.status !== "initialization-failed"
              ) {
                state.status = "initialized";
              }
            });
          };
          reader.readAsText(file);
        }
      },

      setFileContent: async (content) => {
        await get().initializeXmlTools();

        set((state) => {
          state.fileContent = content;
          const schemaInfo = _updateSchemaInfo(content);
          state.currentSchemaInfo = schemaInfo;

          // Update status based on content and schema availability
          if (state.isXmlToolsInitialized) {
            state.status = _updateContentStatus(content, schemaInfo);
          }
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
          // Only change status if we're not already in a more advanced state
          if (state.status === "not_initialized") {
            state.status = "not_initialized"; // Keep the same state during initialization
          }
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
            if (content) {
              const schemaInfo = _updateSchemaInfo(content);
              state.currentSchemaInfo = schemaInfo;
              state.status = _updateContentStatus(content, schemaInfo);
            } else {
              state.status = "initialized";
            }
          });
        } catch (error) {
          console.error("Failed to initialize XML tools:", error);
          set((state) => {
            state.error = `Failed to initialize XML tools: ${error instanceof Error ? error.message : String(error)}`;
            state.isXmlToolsInitialized = false;
            state.status = "initialization-failed";
          });
        }
      },

      validateInput: async () => {
        set((state) => {
          state.status = "validating";
          state.validationResults = null;
          state.error = null;
        });

        if (!get().isXmlToolsInitialized) {
          await get().initializeXmlTools();
          if (!get().isXmlToolsInitialized || get().error) {
            set((state) => {
              state.status = "initialization-failed";
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
            state.status = "initialized";
            state.error = "No XML content to validate.";
          });
          return;
        }

        try {
          // First phase: XML schema validation
          const result = await validateXml(xmlContent);

          // If XML validation failed, stop here
          if (!result.isValid) {
            set((state) => {
              state.validationResults = result;
              state.status = "validation-complete";
              state.error = null;

              if (result.schema && !state.currentSchemaInfo?.url) {
                state.currentSchemaInfo = {
                  urn: result.schema.urn,
                  url: result.schema.url,
                };
              }
            });
            return;
          }

          // If backend validation is not enabled, stop after XML validation
          if (!Config.backendValidation) {
            set((state) => {
              state.validationResults = result;
              state.status = "validation-complete";
              state.error = null;

              if (result.schema && !state.currentSchemaInfo?.url) {
                state.currentSchemaInfo = {
                  urn: result.schema.urn,
                  url: result.schema.url,
                };
              }
            });
            return;
          }

          // Proceed with backend business validation
          set((state) => {
            state.validationResults = result;
            state.status = "server-validating";
          });

          // Import the validator client only when needed
          const { validatorClient } = await import(
            "../_utils/xml/validatorClient"
          );

          try {
            // Second phase: Business rule validation on the server
            const businessResult =
              await validatorClient.validateBusinessRules(xmlContent);

            // Merge the results
            const mergedResult: ValidationResult = {
              ...result,
              ...businessResult,
            };

            set((state) => {
              state.validationResults = mergedResult;
              state.status = "server-validation-complete";
              state.error = null;
            });
          } catch (serverError) {
            console.error("Business validation failed:", serverError);
            const errorMessage = `Business validation failed: ${serverError instanceof Error ? serverError.message : "Unknown error"}`;

            // Set server validation error but preserve the valid XML validation result
            set((state) => {
              if (state.validationResults) {
                state.validationResults = {
                  ...state.validationResults,
                  businessValidation: {
                    isValid: false,
                    details: [{ message: errorMessage }],
                  },
                };
              }
              state.status = "server-validation-complete";
              state.error = errorMessage;
            });
          }
        } catch (error) {
          console.error("Validation failed unexpectedly:", error);
          const errorMessage = `Validation failed: ${error instanceof Error ? error.message : "Unknown error"}`;
          set((state) => {
            state.validationResults = {
              isValid: false,
              details: [{ line: 0, message: errorMessage }],
            };
            state.error = errorMessage;
            state.status = "validation-complete";
          });
        }
      },

      reset: () => {
        const currentState = get();
        const newStatus = currentState.isXmlToolsInitialized
          ? "initialized"
          : "not_initialized";

        set((state) => {
          // Reset most of the state
          Object.assign(state, {
            ...initialState,
            // Keep the initialization status
            isXmlToolsInitialized: currentState.isXmlToolsInitialized,
            status: newStatus,
          });
        });
      },
    };
  }),
);
