import { PDFFile } from "./pdf";

export interface DragAndDropProps {
  onFilesDrop: (files: File[]) => void;
  maxFiles?: number;
  accept?: string[];
  maxSize?: number;
  children?: React.ReactNode;
}

export interface FileListProps {
  files: PDFFile[];
  onRemove: (index: number) => void;
  onMove: (index: number, direction: number) => void;
}

export interface FileItemProps {
  file: PDFFile;
  index: number;
  onRemove: (index: number) => void;
  onMove: (index: number, direction: number) => void;
  isFirst: boolean;
  isLast: boolean;
}

export interface ProgressBarProps {
  progress: number;
  total: number;
  status?: string;
}

export interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

export interface ToolbarProps {
  onMerge: () => void;
  onClear: () => void;
  disabled?: boolean;
  processing?: boolean;
}
