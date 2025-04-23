"use client";

import React from "react";
import cn from "clsx";
import { useValidatorStore } from "@/_store/validatorStore";

const classes = {
  container: "flex items-center",
  validateButton:
    "bg-[var(--color-primary-action)] text-white px-4 py-2 rounded hover:bg-[var(--color-primary-hover)] dark:bg-[var(--color-dark-primary-action)] dark:hover:bg-[var(--color-dark-primary-hover)]",
  clearButton:
    "bg-[var(--color-background-level-3)] text-[var(--color-text)] px-4 py-2 rounded ml-2 hover:bg-[var(--color-secondary-hover)] dark:bg-[var(--color-dark-background-level-3)] dark:text-[var(--color-dark-text)] dark:hover:bg-[var(--color-dark-secondary-action)]",
  loadingButton:
    "bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded cursor-not-allowed dark:bg-[var(--color-dark-primary-hover)] flex items-center space-x-2",
};

export function ButtonSection() {
  const { validateInput, reset, isValidating } =
    useValidatorStore();

  const handleValidate = () => {
    validateInput();
  };

  const handleClear = () => {
    reset(); // Reset everything (input and results)
  };

  return (
    <div id="button-section" className={classes.container}>
      {isValidating ? (
        <button className={cn(classes.loadingButton)} disabled>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Validating...</span>
        </button>
      ) : (
        <button className={cn(classes.validateButton)} onClick={handleValidate}>
          Validate
        </button>
      )}
      <button className={cn(classes.clearButton)} onClick={handleClear}>
        Clear
      </button>
    </div>
  );
}
