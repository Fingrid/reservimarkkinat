"use client";
import React, { useState, useEffect } from "react";
import cn from "clsx";
import { useValidatorStore } from "@/_store/validatorStore";
import { highlightCode } from "@/_utils/syntaxHighlighter";
import { SuccessIcon, UploadIcon } from "@/_components/Icons";
import { useFileUpload } from "../_hooks/useFileUpload";
import { SchemaInfo } from "@/types";
import { WarningIcon } from "@/_components/Icons";

// Styles object
const classes = {
  container: "flex flex-col gap-2",
  label:
    "text-sm font-semibold text-[var(--color-text)] dark:text-[var(--color-dark-text)]",
  dropArea: {
    base: "w-full border border-dashed rounded text-center cursor-pointer transition-colors",
    default:
      "border-[var(--color-separator)] dark:border-[var(--color-dark-separator)] hover:bg-[var(--color-background-level-2)] dark:hover:bg-[var(--color-dark-background-level-2)]",
    active:
      "border-[var(--color-secondary-action)] dark:border-[var(--color-dark-secondary-action)] bg-[var(--color-background-level-2)] dark:bg-[var(--color-dark-background-level-2)]",
    withFile: "p-1 min-h-[1rem]",
    withoutFile: "p-8 min-h-[15rem]",
  },
  text: {
    primary:
      "text-sm font-medium text-[var(--color-text)] dark:text-[var(--color-dark-text)]",
    secondary:
      "text-xs text-[var(--color-breadcrumb)] dark:text-[var(--color-dark-text)] opacity-70",
  },
};

// FileDropZone subcomponent
const FileDropZone = ({
  fileInputRef,
  fileName,
  isDragging,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
  onClick,
  onFileChange,
}: {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  fileName: string | null;
  isDragging: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onClick: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const dropAreaClasses = cn(
    classes.dropArea.base,
    isDragging ? classes.dropArea.active : "",
    classes.dropArea.default,
    fileName ? classes.dropArea.withFile : classes.dropArea.withoutFile,
  );

  return (
    <div
      className={dropAreaClasses}
      onClick={onClick}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        type="file"
        accept=".xml"
        className="hidden"
        ref={fileInputRef}
        onChange={onFileChange}
      />
      {fileName ? <FileInfoDisplay fileName={fileName} /> : <UploadPrompt />}
    </div>
  );
};

// Additional styles
const componentClasses = {
  fileInfo: {
    container: "flex flex-row items-center gap-3 justify-start w-full px-4",
    contentContainer: "flex flex-col items-start",
  },
  uploadPrompt: {
    container: "flex flex-col items-center gap-2",
  },
  fileContent: {
    container: "mt-2",
    header: "flex justify-between items-center mb-1",
    schemaInfo: "text-xs text-gray-500 dark:text-gray-400",
    schemaUrn: "mr-2",
    schemaLink: "underline hover:text-blue-500 dark:hover:text-blue-400",
    content: {
      base: "w-full border rounded p-4 overflow-auto max-h-[20rem]",
      default:
        "border-[var(--color-separator)] dark:border-[var(--color-dark-separator)]",
      error: "border-red-500 dark:border-red-500",
    },
  },
};

// FileInfoDisplay subcomponent
const FileInfoDisplay = ({ fileName }: { fileName: string }) => (
  <div className={componentClasses.fileInfo.container}>
    <SuccessIcon />
    <div className={componentClasses.fileInfo.contentContainer}>
      <p className={classes.text.primary}>{fileName}</p>
      <p className={classes.text.secondary}>Click to change file</p>
    </div>
  </div>
);

// UploadPrompt subcomponent
const UploadPrompt = () => (
  <div className={componentClasses.uploadPrompt.container}>
    <UploadIcon />
    <p className={classes.text.primary}>Drag and drop your XML file here</p>
    <p className={classes.text.secondary}>or click to browse</p>
  </div>
);

// FileContent subcomponent
const FileContent = ({
  content,
  schemaInfo,
  hasValidationErrors,
}: {
  content: string;
  schemaInfo: SchemaInfo | null;
  hasValidationErrors: boolean;
}) => {
  const contentClasses = cn(
    componentClasses.fileContent.content.base,
    hasValidationErrors
      ? componentClasses.fileContent.content.error
      : componentClasses.fileContent.content.default,
  );

  return (
    <div className={componentClasses.fileContent.container}>
      <div className={componentClasses.fileContent.header}>
        <label className={classes.label}>File Content:</label>
        {schemaInfo && (
          <div className={componentClasses.fileContent.schemaInfo}>
            {schemaInfo.urn && (
              <span className={componentClasses.fileContent.schemaUrn}>
                URN: {schemaInfo.urn}
                {schemaInfo.urn && !schemaInfo.url && <WarningIcon />}
              </span>
            )}
            {schemaInfo.url && (
              <a
                href={schemaInfo.url}
                target="_blank"
                rel="noopener noreferrer"
                className={componentClasses.fileContent.schemaLink}
              >
                View Schema
              </a>
            )}
          </div>
        )}
      </div>
      <div
        className={contentClasses}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

// Main component
export function FileInputArea() {
  const [highlightedXml, setHighlightedXml] = useState<string>("");
  const {
    fileInput,
    fileContent,
    currentSchemaInfo,
    validationResults,
    setFileInput,
    setFileContent,
  } = useValidatorStore();

  const fileName = fileInput?.name || null;

  // Handle file content reading
  const handleFileSelected = (file: File) => {
    setFileInput(file);
    readFileContent(file);
  };

  const readFileContent = async (file: File) => {
    try {
      const content = await file.text();
      setFileContent(content);
    } catch (error) {
      console.error("Error reading file:", error);
      setFileContent("");
    }
  };

  // Setup file upload functionality
  const {
    isDragging,
    fileInputRef,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleFileInput,
    openFileExplorer,
  } = useFileUpload({ onFileSelected: handleFileSelected });

  // Update highlighted XML when fileContent or validationResults change
  useEffect(() => {
    if (fileContent) {
      const errorLines =
        validationResults?.details?.map(
          (error: { line: number }) => error.line,
        ) || [];

      highlightCode(fileContent, errorLines)
        .then((highlighted) => setHighlightedXml(highlighted))
        .catch((error: Error) =>
          console.error("Error highlighting XML:", error),
        );
    } else {
      setHighlightedXml("");
    }
  }, [fileContent, validationResults]);

  // Check if there are any validation errors
  const hasValidationErrors =
    validationResults &&
    !validationResults.isValid &&
    !!validationResults.details?.length;

  return (
    <div id="file-input-area" className={classes.container}>
      <label className={classes.label}>XML File</label>

      <FileDropZone
        fileInputRef={fileInputRef}
        fileName={fileName}
        isDragging={isDragging}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileExplorer}
        onFileChange={handleFileInput}
      />

      {fileContent && (
        <FileContent
          content={highlightedXml}
          schemaInfo={currentSchemaInfo}
          hasValidationErrors={!!hasValidationErrors}
        />
      )}
    </div>
  );
}
