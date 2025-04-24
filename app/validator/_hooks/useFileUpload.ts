"use client";
import { useState, useRef, DragEvent, ChangeEvent, RefObject } from "react";

interface UseFileUploadResult {
  isDragging: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
  handleDragEnter: (e: DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: DragEvent<HTMLDivElement>) => void;
  handleFileInput: (e: ChangeEvent<HTMLInputElement>) => void;
  openFileExplorer: () => void;
}

interface UseFileUploadProps {
  onFileSelected: (file: File) => void;
}

export const useFileUpload = ({ onFileSelected }: UseFileUploadProps): UseFileUploadResult => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      onFileSelected(droppedFile);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelected(file);
    }
  };

  const openFileExplorer = () => {
    fileInputRef.current?.click();
  };

  return {
    isDragging,
    fileInputRef,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleFileInput,
    openFileExplorer
  };
};
