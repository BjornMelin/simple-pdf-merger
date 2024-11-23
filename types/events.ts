import { PDFFile, PDFMergeOptions, PDFMetadata } from "./pdf";

export interface FileChangeEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export interface DropEvent extends React.DragEvent<HTMLDivElement> {
  dataTransfer: DataTransfer;
}

export interface MergeEvent {
  files: PDFFile[];
  options?: PDFMergeOptions;
  metadata?: PDFMetadata;
  timestamp: number;
}

export interface ProgressEvent {
  loaded: number;
  total: number;
  percentage: number;
}

export interface ErrorEvent {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export type FileEventHandler = (event: FileChangeEvent) => void;
export type DropEventHandler = (event: DropEvent) => void;
export type MergeEventHandler = (event: MergeEvent) => void;
export type ProgressEventHandler = (event: ProgressEvent) => void;
export type ErrorEventHandler = (event: ErrorEvent) => void;
