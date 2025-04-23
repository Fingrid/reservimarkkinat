"use client";
import React, { useRef, useState, useEffect, ChangeEvent, DragEvent } from "react";
import cn from "clsx";
import { useValidatorStore } from "@/_store/validatorStore";
import { highlightCode } from "@/_utils/syntaxHighlighter";

const classes = {
  container: "flex flex-col gap-2",
  label:
    "text-sm font-semibold text-[var(--color-text)] dark:text-[var(--color-dark-text)]",
  dropArea: {
    base: "w-full border-2 border-dashed rounded text-center cursor-pointer transition-colors",
    default:
      "border-[var(--color-separator)] dark:border-[var(--color-dark-separator)] hover:bg-[var(--color-background-level-2)] dark:hover:bg-[var(--color-dark-background-level-2)]",
    active:
      "border-[var(--color-secondary-action)] dark:border-[var(--color-dark-secondary-action)] bg-[var(--color-background-level-2)] dark:bg-[var(--color-dark-background-level-2)]",
    withFile: "p-1 min-h-[1rem]",
    withoutFile: "p-8 min-h-[15rem]"
  },
  text: {
    primary:
      "text-sm font-medium text-[var(--color-text)] dark:text-[var(--color-dark-text)]",
    secondary:
      "text-xs text-[var(--color-breadcrumb)] dark:text-[var(--color-dark-text)] opacity-70",
  },
};

// SVG Components
const SuccessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-[var(--color-primary-action)] dark:text-[var(--color-dark-primary-action)]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-[var(--color-secondary-action)] dark:text-[var(--color-dark-secondary-action)]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);

export function FileInputArea() {
  const [isDragging, setIsDragging] = useState(false);
  const [highlightedXml, setHighlightedXml] = useState<string>('');
  // Read validationResults as well for highlighting error lines
  const { fileInput, fileContent, currentSchemaInfo, validationResults, setFileInput, setFileContent } =
    useValidatorStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileName = fileInput?.name || null;

  // Update highlighted XML when fileContent or validationResults change
  useEffect(() => {
    if (fileContent) {
      // Pass error lines from validationResults if available
      highlightCode(fileContent, validationResults?.details?.map((error: { line: number }) => error.line) || []) // Added type for error
        .then(highlighted => setHighlightedXml(highlighted))
        .catch((error: Error) => console.error('Error highlighting XML:', error)); // Added type for error
    } else {
      setHighlightedXml('');
    }
  }, [fileContent, validationResults]); // Keep validationResults dependency

  // Modified readFileContent to call setFileContent from the store
  const readFileContent = async (file: File) => {
    try {
      const content = await file.text();
      setFileContent(content); // Call store action, which now handles schema info extraction
    } catch (error) {
      console.error("Error reading file:", error);
      // Optionally clear content/schema info on error
      setFileContent("");
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileInput(file);
      readFileContent(file);
    }
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      if (fileInputRef.current) {
        fileInputRef.current.files = files;
      }
      const droppedFile = files[0];
      setFileInput(droppedFile);
      readFileContent(droppedFile);
    }
  };
  const openFileExplorer = () => {
    fileInputRef.current?.click();
  };
  return (
    <div id="file-input-area" className={classes.container}>
      <label className={classes.label}>XML File</label>
      <div
        className={cn(
          classes.dropArea.base,
          isDragging ? classes.dropArea.active : "",
          cn(classes.dropArea.default, fileName ? classes.dropArea.withFile : classes.dropArea.withoutFile),
        )}
        onClick={openFileExplorer}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".xml"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileInput}
        />
        {fileName ? (
          <div className="flex flex-row items-center gap-3 justify-start w-full px-4">
            <SuccessIcon />
            <div className="flex flex-col items-start">
              <p className={classes.text.primary}>{fileName}</p>
              <p className={classes.text.secondary}>Click to change file</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <UploadIcon />
            <p className={classes.text.primary}>
              Drag and drop your XML file here
            </p>
            <p className={classes.text.secondary}>or click to browse</p>
          </div>
        )}
      </div>

      {fileContent && (
        <div className="mt-2">
          <div className="flex justify-between items-center mb-1">
            <label className={classes.label}>File Content:</label>
            {currentSchemaInfo && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {currentSchemaInfo.urn && (
                  <span className="mr-2">URN: {currentSchemaInfo.urn}</span>
                )}
                {currentSchemaInfo.url && (
                  <a
                    href={currentSchemaInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    View Schema
                  </a>
                )}
              </div>
            )}
          </div>
          <div 
            className="w-full border rounded p-4 overflow-auto max-h-[20rem] border-[var(--color-separator)] dark:border-[var(--color-dark-separator)]"
            dangerouslySetInnerHTML={{ __html: highlightedXml }}
          />
        </div>
      )}
    </div>
  );
}
