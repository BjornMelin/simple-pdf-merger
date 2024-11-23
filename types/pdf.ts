export interface PDFFile {
  name: string;
  file: File;
  size: string;
  lastModified?: number;
  path?: string;
}

export interface PDFMergerProps {
  maxFileSize?: number; // in MB
  maxFiles?: number;
  allowedTypes?: string[];
  onMergeComplete?: (url: string) => void;
  onError?: (error: Error) => void;
}

export interface PDFMergeOptions {
  orientation?: "portrait" | "landscape";
  paperSize?: "a4" | "letter" | "legal";
  margin?: number;
  compression?: boolean;
}

export interface PDFMetadata {
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string[];
  creator?: string;
  producer?: string;
  creationDate?: Date;
  modificationDate?: Date;
}
