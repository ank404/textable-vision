
export interface TableData {
  data: Record<string, string>[];
  headers: string[];
  position: {
    page: number;
    index: number;
  };
}

export interface ContentItem {
  type: 'text' | 'table';
  content?: string;
  data?: any[];
  headers?: string[];
  position: any;
}

export interface OcrResponse {
  extracted_text: string;
  tables?: TableData[];
  content: ContentItem[];
}

export interface DocumentFile extends File {
  preview?: string;
}

export interface UploadState {
  isLoading: boolean;
  error: string | null;
  data: OcrResponse | null;
  file: DocumentFile | null;
}
