
import React, { useCallback, useState } from 'react';
import { Upload, X, FileText, File, Image } from 'lucide-react';
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

  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff'].includes(extension || '')) {
      return <Image className="h-6 w-6 text-blue-600" />;
    } else if (extension === 'pdf') {
      return <File className="h-6 w-6 text-red-600" />;
    } else {
      return <FileText className="h-6 w-6 text-indigo-600" />;
    }
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          className={`${
            dragActive 
              ? 'border-blue-400 bg-blue-50 shadow-md' 
              : 'border-slate-200 bg-white'
          } ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          } transition-all duration-200 border-2 border-dashed rounded-xl h-60 flex items-center justify-center`}
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
            <div className={`
              ${dragActive ? 'bg-blue-100 text-blue-600 scale-110' : 'bg-blue-50 text-blue-500'} 
              rounded-full p-6 mb-4 transition-all duration-200
            `}>
              <Upload className="h-8 w-8" />
            </div>
            <p className="text-center mb-2 font-bold text-slate-700">
              {dragActive ? 'Drop your file here' : 'Drag & drop or click to upload'}
            </p>
            <p className="text-sm text-slate-500 text-center max-w-xs px-6">
              Supports PDF, PNG, JPG, JPEG, TIFF, and BMP files
            </p>
            
            <div className="mt-4 flex gap-3 justify-center">
              <div className="px-3 py-1 rounded-full bg-blue-50 text-xs font-medium text-blue-700">PDF</div>
              <div className="px-3 py-1 rounded-full bg-green-50 text-xs font-medium text-green-700">JPG</div>
              <div className="px-3 py-1 rounded-full bg-purple-50 text-xs font-medium text-purple-700">PNG</div>
            </div>
          </label>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-5 animate-fade-in border border-blue-100 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg bg-blue-50 p-3 mr-4">
              {getFileIcon(file.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-700 truncate">{file.name}</p>
              <p className="text-sm text-slate-500">
                {(file.size / 1024).toFixed(2)} KB • Ready to process
              </p>
            </div>
            {!disabled && (
              <button 
                className="ml-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors" 
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
