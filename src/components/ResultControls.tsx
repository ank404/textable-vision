
import React from 'react';
import { Download, Copy, Trash2, CheckCircle } from 'lucide-react';
import { OcrResponse } from '../types';
import { toast } from "sonner";

interface ResultControlsProps {
  data: OcrResponse | null;
  onClear: () => void;
}

const ResultControls: React.FC<ResultControlsProps> = ({ data, onClear }) => {
  if (!data) return null;

  const handleCopy = async () => {
    // If there's only extracted text and no structured content
    if (data.extracted_text && (!data.content || data.content.length === 0)) {
      await navigator.clipboard.writeText(data.extracted_text);
      toast.success('Text copied to clipboard', {
        icon: <CheckCircle className="h-4 w-4 text-green-500" />
      });
      return;
    }

    // Otherwise, create a formatted string from all content
    let textContent = '';
    
    if (data.content && data.content.length > 0) {
      data.content.forEach(item => {
        if (item.type === 'text' && item.content) {
          textContent += item.content + '\n\n';
        } else if (item.type === 'table' && item.headers && item.data) {
          // Format table as text
          textContent += item.headers.join('\t') + '\n';
          item.data.forEach(row => {
            textContent += item.headers!.map(header => row[header] || '').join('\t') + '\n';
          });
          textContent += '\n';
        }
      });
    } else if (data.extracted_text) {
      textContent = data.extracted_text;
    }

    await navigator.clipboard.writeText(textContent);
    toast.success('Content copied to clipboard', {
      icon: <CheckCircle className="h-4 w-4 text-green-500" />
    });
  };

  const handleDownload = () => {
    let content = '';
    let filename = 'ocr-result.txt';
    
    if (data.content && data.content.length > 0) {
      // Create a formatted text representation of all content
      data.content.forEach(item => {
        if (item.type === 'text' && item.content) {
          content += item.content + '\n\n';
        } else if (item.type === 'table' && item.headers && item.data) {
          // Format table as TSV
          content += item.headers.join('\t') + '\n';
          item.data.forEach(row => {
            content += item.headers!.map(header => row[header] || '').join('\t') + '\n';
          });
          content += '\n';
        }
      });
    } else if (data.extracted_text) {
      content = data.extracted_text;
    }

    // Create and download the file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('File downloaded successfully', {
      icon: <CheckCircle className="h-4 w-4 text-green-500" />
    });
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <button 
        onClick={handleCopy} 
        className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 hover:shadow-md transition-all"
        aria-label="Copy content"
      >
        <Copy className="h-4 w-4 mr-1" />
        Copy
      </button>
      
      <button 
        onClick={handleDownload} 
        className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 border border-indigo-200 hover:shadow-md transition-all"
        aria-label="Download content"
      >
        <Download className="h-4 w-4 mr-1" />
        Download
      </button>
      
      <button 
        onClick={onClear} 
        className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border border-gray-200 hover:shadow-md transition-all"
        aria-label="Clear results"
      >
        <Trash2 className="h-4 w-4 mr-1" />
        Clear
      </button>
    </div>
  );
};

export default ResultControls;
