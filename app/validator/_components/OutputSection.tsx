"use client";

import React from "react";
import { useValidatorStore } from "@/_store/validatorStore";

const classes = {
  container: "flex-1",
  wrapper: "flex flex-col gap-2",
  label:
    "text-sm font-semibold text-[var(--color-text)] dark:text-[var(--color-dark-text)]",
  textarea:
    "w-full border border-[var(--color-separator)] dark:border-[var(--color-dark-separator)] rounded p-2 bg-[var(--color-background-level-1)] dark:bg-[var(--color-dark-background-level-1)] text-[var(--color-text)] dark:text-[var(--color-dark-text)]",
  resultSuccess:
    "p-3 bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100 rounded mb-3",
  resultError:
    "p-3 bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100 rounded mb-3",
  errorsList: "list-disc pl-5 mt-2 space-y-1",
  errorItem: "text-sm",
};

export function OutputSection() {
  const { validationResults, isValidating } = useValidatorStore();

  if(!validationResults && !isValidating) {
    return <></>;
  }

  return (
    <div id="output-section" className={classes.container}>
      <div className={classes.wrapper}>
        <div className="flex justify-between items-center">
          <label htmlFor="xml-output" className={classes.label}>
            Validation Results
          </label>
        </div>

        {validationResults && (
          <div
            className={
              validationResults.isValid
                ? classes.resultSuccess
                : classes.resultError
            }
          >
            {validationResults.isValid ? (
              <p>✅ XML is valid</p>
            ) : (
              <>
                <p>❌ XML is invalid</p>
                {validationResults.details &&
                  validationResults.details.length > 0 && (
                    <ul className={classes.errorsList}>
                      {validationResults.details.map((error, index) => (
                        <li key={index} className={classes.errorItem}>
                          Line {error.line}: {error.message}
                        </li>
                      ))}
                    </ul>
                  )}
              </>
            )}
          </div>
        )}

        {isValidating && (
          <div className="p-3 bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded mb-3">
            <p>Validating XML...</p>
          </div>
        )}
      </div>
    </div>
  );
}
