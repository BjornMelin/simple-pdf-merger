import { PDFFile, PDFMergeOptions, PDFMetadata } from "./pdf";

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
}

export interface MergeRequestBody {
  files: PDFFile[];
  options?: PDFMergeOptions;
  metadata?: PDFMetadata;
}

export interface MergeResponse {
  url: string;
  size: number;
  pageCount: number;
  metadata: PDFMetadata;
}

export interface ErrorResponse {
  message: string;
  code: string;
  details?: Record<string, any>;
}

export type APIEndpoints = {
  MERGE_PDFS: "/api/merge";
  GET_STATUS: "/api/status";
  DOWNLOAD: "/api/download";
};
