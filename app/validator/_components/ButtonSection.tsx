"use client";

import React from "react";
import cn from "clsx";
import { useValidatorStore } from "@/_store/validatorStore";
import { SpinnerIcon } from "@/_components/Icons";

const classes = {
  container: "flex items-center",
  validateButton:
    "bg-[var(--color-primary-action)] text-white px-4 py-2 rounded hover:bg-[var(--color-primary-hover)] dark:bg-[var(--color-dark-primary-action)] dark:hover:bg-[var(--color-dark-primary-hover)]",
  clearButton:
    "bg-[var(--color-background-level-3)] text-[var(--color-text)] px-4 py-2 rounded ml-2 hover:bg-[var(--color-secondary-hover)] dark:bg-[var(--color-dark-background-level-3)] dark:text-[var(--color-dark-text)] dark:hover:bg-[var(--color-dark-secondary-action)]",
  loadingButton:
    "bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded cursor-not-allowed dark:bg-[var(--color-dark-primary-hover)] flex items-center space-x-2",
  disabledButton:
    "bg-[var(--color-background-level-3)] text-[var(--color-text)] opacity-60 px-4 py-2 rounded cursor-not-allowed dark:bg-[var(--color-dark-background-level-3)] dark:text-[var(--color-dark-text)]",
};

export function ButtonSection() {
  const { validateInput, reset, status, fileContent } =
    useValidatorStore();

  const handleValidate = () => {
    validateInput();
  };

  const handleClear = () => {
    reset();
  };

  // Determine if validation is in progress (either client-side or server-side)
  const isValidating =
    status === "validating" || status === "server-validating";

  // Determine if validation should be disabled based on the current state
  const isValidationDisabled = status !== "content-ready" || isValidating;

  // Create tooltip message based on the disabled reason
  let disabledTooltip = "";
  if (!fileContent) {
    disabledTooltip = "Upload a file to validate";
  } else if (status === "content-error") {
    disabledTooltip = "Schema definition not found for this XML";
  } else if (
    status === "not_initialized" ||
    status === "initialization-failed"
  ) {
    disabledTooltip = "XML validation environment is not ready";
  } else if (status === "validating") {
    disabledTooltip = "XML validation in progress";
  } else if (status === "server-validating") {
    disabledTooltip = "Business rules validation in progress";
  } else if (status !== "content-ready") {
    disabledTooltip = "Content is not ready for validation";
  }

  return (
    <div id="button-section" className={classes.container}>
      {isValidating ? (
        <button className={cn(classes.loadingButton)} disabled>
          <SpinnerIcon />
          <span>Validating...</span>
        </button>
      ) : isValidationDisabled ? (
        <div className="relative group">
          <button className={cn(classes.disabledButton)} disabled>
            Validate
          </button>
          {disabledTooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
              {disabledTooltip}
            </div>
          )}
        </div>
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
