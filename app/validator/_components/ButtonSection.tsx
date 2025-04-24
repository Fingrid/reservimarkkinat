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
};

export function ButtonSection() {
  const { validateInput, reset, isValidating } =
    useValidatorStore();

  const handleValidate = () => {
    validateInput();
  };

  const handleClear = () => {
    reset();
  };

  return (
    <div id="button-section" className={classes.container}>
      {isValidating ? (
        <button className={cn(classes.loadingButton)} disabled>
          <SpinnerIcon />
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
