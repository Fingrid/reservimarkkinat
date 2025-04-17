"use client";

import { create } from "zustand";

// Define validation result type
interface ValidationResult {
  isValid: boolean;
  errors?: Array<{
    line: number;
    message: string;
  }>;
  warnings?: Array<{
    line: number;
    message: string;
  }>;
}

interface ValidatorState {
  // Input state
  activeTab: "file" | "text";
  textInput: string;
  fileInput: File | null;
  fileContent: string;

  // Validation state
  isValidating: boolean;
  validationResults: ValidationResult | null;

  // Actions
  setActiveTab: (tab: "file" | "text") => void;
  setTextInput: (text: string) => void;
  setFileInput: (file: File | null) => void;
  setFileContent: (content: string) => void;
  validateInput: () => Promise<void>;
  clearInput: () => void;
  clearResults: () => void;
  reset: () => void;
}

export const useValidatorStore = create<ValidatorState>((set, get) => ({
  // Initial state
  activeTab: "file",
  textInput: "",
  fileInput: null,
  fileContent: "",
  isValidating: false,
  validationResults: null,

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setTextInput: (text) => set({ textInput: text }),
  setFileInput: (file) => set({ fileInput: file }),
  setFileContent: (content) => set({ fileContent: content }),

  validateInput: async () => {
    const { activeTab, textInput, fileInput } = get();

    // Nothing to validate
    if (
      (activeTab === "text" && !textInput) ||
      (activeTab === "file" && !fileInput)
    ) {
      return;
    }

    set({ isValidating: true, validationResults: null });

    try {
      // Extract content based on active tab
      const xmlContent =
        activeTab === "text"
          ? textInput
          : fileInput
            ? await fileInput.text()
            : "";

      // This is a placeholder for actual XML validation

      // Simulated delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Simple validation check (this should be replaced with proper validation)
      const isValid =
        xmlContent.includes("<?xml") &&
        xmlContent.includes("<") &&
        xmlContent.includes(">");

      const result: ValidationResult = isValid
        ? { isValid: true }
        : {
            isValid: false,
            errors: [{ line: 1, message: "Invalid XML format" }],
          };

      set({ validationResults: result, isValidating: false });
    } catch (error) {
      set({
        validationResults: {
          isValid: false,
          errors: [
            {
              line: 0,
              message: error instanceof Error ? error.message : "Unknown error",
            },
          ],
        },
        isValidating: false,
      });
    }
  },

  clearInput: () =>
    set({
      textInput: "",
      fileInput: null,
      fileContent: "",
    }),

  clearResults: () =>
    set({
      validationResults: null,
    }),

  reset: () =>
    set({
      textInput: "",
      fileInput: null,
      fileContent: "",
      validationResults: null,
      isValidating: false,
    }),
}));
