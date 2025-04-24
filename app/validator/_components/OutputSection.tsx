"use client";

import React from "react";
import { useValidatorStore } from "@/_store/validatorStore";

interface ValidationError {
  line: number;
  message: string;
}

// Styles
const classes = {
  container: "flex-1",
  wrapper: "flex flex-col gap-2",
  label:
    "text-sm font-semibold text-[var(--color-text)] dark:text-[var(--color-dark-text)]",
  result: {
    success:
      "p-3 bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100 rounded mb-3",
    error:
      "p-3 bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100 rounded mb-3",
    loading:
      "p-3 bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded mb-3",
  },
  errors: {
    list: "list-disc pl-5 mt-2 space-y-1",
    item: "text-sm",
  },
};

const SectionHeader = () => (
  <div className="flex justify-between items-center">
    <label htmlFor="xml-output" className={classes.label}>
      Validation Results
    </label>
  </div>
);

const ValidationSuccess = () => (
  <div className={classes.result.success}>
    <p>✅ XML is valid</p>
  </div>
);

const ValidationError = ({ errors }: { errors?: ValidationError[] }) => (
  <div className={classes.result.error}>
    <p>❌ XML is invalid</p>
    {errors && errors.length > 0 && (
      <ul className={classes.errors.list}>
        {errors.map((error, index) => (
          <li key={index} className={classes.errors.item}>
            Line {error.line}: {error.message}
          </li>
        ))}
      </ul>
    )}
  </div>
);

const ValidationLoading = () => (
  <div className={classes.result.loading}>
    <p>Validating XML...</p>
  </div>
);

export function OutputSection() {
  const { validationResults, isValidating } = useValidatorStore();

  if (!validationResults && !isValidating) {
    return null;
  }

  return (
    <div id="output-section" className={classes.container}>
      <div className={classes.wrapper}>
        <SectionHeader />
        {isValidating && <ValidationLoading />}
        {!isValidating &&
          validationResults &&
          (validationResults.isValid ? (
            <ValidationSuccess />
          ) : (
            <ValidationError errors={validationResults.details} />
          ))}
      </div>
    </div>
  );
}
