"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, MoveUp, MoveDown, Trash2, FileText } from "lucide-react";
import type { PDFFile, PDFMergerProps } from "@/types/pdf";

const PDFMerger: React.FC<PDFMergerProps> = ({
  maxFileSize = 10, // Default 10MB
  maxFiles = 20, // Default 20 files
}) => {
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    setError(null);

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return false;
    }

    if (file.size > maxFileSize * 1024 * 1024) {
      setError(`File size must be less than ${maxFileSize}MB`);
      return false;
    }

    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (pdfFiles.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const validFiles = files.filter(validateFile).map((file) => ({
      name: file.name,
      file: file,
      size: (file.size / 1024 / 1024).toFixed(2),
    }));

    setPdfFiles((prev) => [...prev, ...validFiles]);
    event.target.value = ""; // Reset input
  };

  const moveFile = (index: number, direction: number) => {
    const newFiles = [...pdfFiles];
    const temp = newFiles[index];
    newFiles[index] = newFiles[index + direction];
    newFiles[index + direction] = temp;
    setPdfFiles(newFiles);
  };

  const removeFile = (index: number) => {
    setPdfFiles((files) => files.filter((_, idx) => idx !== index));
  };

  const handleMerge = async () => {
    try {
      // Here you would implement the actual PDF merging logic
      // This is a placeholder for the backend integration
      const formData = new FormData();
      pdfFiles.forEach((file, index) => {
        formData.append(`file${index}`, file.file);
      });

      // Example API call:
      // const response = await fetch('/api/merge-pdf', {
      //   method: 'POST',
      //   body: formData,
      // });

      console.log("Files to merge:", pdfFiles);
      alert(
        "Ready to merge! In a real application, these files would be sent to a backend service for merging."
      );
    } catch (err) {
      setError("Error merging PDFs. Please try again.");
      console.error("Error:", err);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);

      if (pdfFiles.length + files.length > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`);
        return;
      }

      const validFiles = files.filter(validateFile).map((file) => ({
        name: file.name,
        file: file,
        size: (file.size / 1024 / 1024).toFixed(2),
      }));

      setPdfFiles((prev) => [...prev, ...validFiles]);
    },
    [maxFiles, pdfFiles.length]
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-6 h-6" />
          Simple PDF Merger
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        {/* File Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 transition-colors
            ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
            ${pdfFiles.length === 0 ? "h-40" : "h-auto"}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="text-sm text-gray-600">
              Drag & drop PDF files here or click to browse
            </span>
          </label>
        </div>

        {/* File List */}
        {pdfFiles.length > 0 && (
          <div className="space-y-2">
            {pdfFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="text-sm font-medium">{file.name}</div>
                    <div className="text-xs text-gray-500">{file.size} MB</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveFile(index, -1)}
                    disabled={index === 0}
                    className="h-8 w-8"
                  >
                    <MoveUp className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveFile(index, 1)}
                    disabled={index === pdfFiles.length - 1}
                    className="h-8 w-8"
                  >
                    <MoveDown className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index)}
                    className="h-8 w-8 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Merge Button */}
        {pdfFiles.length >= 2 && (
          <Button className="w-full mt-4" onClick={handleMerge}>
            Merge {pdfFiles.length} PDFs
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PDFMerger;
