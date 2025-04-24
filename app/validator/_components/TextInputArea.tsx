"use client";
import React from "react";
import cn from "clsx";
import { useValidatorStore } from "@/_store/validatorStore";
const classes = {
  container: "flex flex-col gap-2",
  label:
    "text-sm font-semibold text-[var(--color-text)] dark:text-[var(--color-dark-text)]",
  textarea: {
    base: "w-full border rounded p-4 font-mono text-sm transition-colors min-h-[15rem]",
    default:
      "border-[var(--color-separator)] dark:border-[var(--color-dark-separator)] bg-[var(--color-background-level-1)] dark:bg-[var(--color-dark-background-level-1)] text-[var(--color-text)] dark:text-[var(--color-dark-text)]",
    focus:
      "focus:border-[var(--color-secondary-action)] dark:focus:border-[var(--color-dark-secondary-action)] focus:outline-none focus:ring-1 focus:ring-[var(--color-secondary-action)] dark:focus:ring-[var(--color-dark-secondary-action)]",
  },
};
export function TextInputArea() {
  const { textInput, setTextInput } = useValidatorStore();
  return (
    <div id="text-input-area" className={classes.container}>
      {" "}
      <label htmlFor="xml-input" className={classes.label}>
        XML Input
      </label>{" "}
      <textarea
        id="xml-input"
        rows={10}
        className={cn(
          classes.textarea.base,
          classes.textarea.default,
          classes.textarea.focus,
        )}
        placeholder="Paste your XML here..."
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      ></textarea>
    </div>
  );
}
