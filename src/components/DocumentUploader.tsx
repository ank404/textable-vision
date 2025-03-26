
import React, { useCallback, useState } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { DocumentFile } from '../types';

interface DocumentUploaderProps {
  onFileAccepted: (file: DocumentFile) => void;
  disabled?: boolean;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ 
  onFileAccepted, 
  disabled = false 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<DocumentFile | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const processFile = useCallback((file: File) => {
    const documentFile: DocumentFile = file;
    documentFile.preview = URL.createObjectURL(file);
    
    setFile(documentFile);
    onFileAccepted(documentFile);
  }, [onFileAccepted]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0] && !disabled) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [processFile, disabled]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0] && !disabled) {
      processFile(e.target.files[0]);
    }
  }, [processFile, disabled]);

  const removeFile = useCallback(() => {
    if (file && file.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setFile(null);
  }, [file]);

  return (
    <div className="w-full">
      {!file ? (
        <div
          className={`dropzone h-60 ${dragActive ? 'active' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleChange}
            accept=".pdf,.png,.jpg,.jpeg,.tiff,.bmp"
            disabled={disabled}
          />
          
          <label 
            htmlFor="file-upload" 
            className={`flex flex-col items-center justify-center h-full w-full ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="rounded-full bg-muted p-3 mb-3">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-center mb-1 font-medium">
              Drag & drop or click to upload
            </p>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              Supports PDF, PNG, JPG, JPEG, TIFF, and BMP files
            </p>
          </label>
        </div>
      ) : (
        <div className="glass-darker rounded-xl p-4 animate-fade-in">
          <div className="flex items-center">
            <div className="rounded-lg bg-muted/50 p-2 mr-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
            {!disabled && (
              <button 
                className="btn-icon ml-2 text-muted-foreground" 
                onClick={removeFile}
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;
