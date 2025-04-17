"use client";

import React from "react";
import cn from "clsx";
import { useValidatorStore } from "@/_store/validatorStore";

const classes = {
  base: "px-4 py-2 bg-transparent text-[var(--color-text)] dark:text-[var(--color-dark-text)]",
  active:
    "border-b-2 border-[var(--color-secondary-action)] dark:border-[var(--color-dark-secondary-action)]",
  inactive:
    "border-b-2 border-[var(--color-background-level-2)] dark:border-[var(--color-dark-background-level-2)]",
};

export function InputTabs() {
  const { activeTab, setActiveTab } = useValidatorStore();

  return (
    <div id="input-type-tabs" className="flex gap-4 mb-4">
      <button
        className={cn(
          classes.base,
          activeTab === "file" ? classes.active : classes.inactive,
        )}
        onClick={() => setActiveTab("file")}
      >
        Attach as file
      </button>
      <button
        className={cn(
          classes.base,
          activeTab === "text" ? classes.active : classes.inactive,
        )}
        onClick={() => setActiveTab("text")}
      >
        Input as text
      </button>
    </div>
  );
}
