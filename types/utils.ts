export interface FileValidationOptions {
  maxSize?: number;
  allowedTypes?: string[];
  maxFiles?: number;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface FileWithPreview extends File {
  preview?: string;
}

export interface StorageOptions {
  prefix?: string;
  expires?: number;
}

export type SizeUnit = "B" | "KB" | "MB" | "GB";

export interface FormatOptions {
  locale?: string;
  currency?: string;
  decimals?: number;
}

export type ErrorCode =
  | "FILE_TOO_LARGE"
  | "INVALID_TYPE"
  | "TOO_MANY_FILES"
  | "MERGE_FAILED"
  | "NETWORK_ERROR"
  | "UNKNOWN_ERROR";
