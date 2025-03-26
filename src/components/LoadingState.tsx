
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { FileText, ScanSearch } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  progress?: number;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Processing document...',
  progress = 0
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-60 text-center animate-fade-in">
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping-slow opacity-75" style={{ animationDuration: '3s' }}></div>
        <div className="relative rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-4 shadow-xl shadow-blue-500/20">
          <ScanSearch className="h-8 w-8 text-white" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-3 tracking-tight">{message}</h3>
      
      <div className="w-full max-w-md mb-4">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          >
            {progress === 100 && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-75 animate-pulse"></div>
            )}
          </div>
        </div>
        <p className="text-sm font-medium text-indigo-700 mt-2">{progress}% Complete</p>
      </div>
      
      <div className="flex items-center justify-center gap-3 text-sm text-gray-600 max-w-xs border border-blue-100 rounded-lg p-3 bg-blue-50">
        {progress < 50 ? (
          <>
            <FileText className="h-4 w-4 text-blue-600" />
            <p>Uploading your document...</p>
          </>
        ) : progress < 100 ? (
          <>
            <svg className="h-4 w-4 text-indigo-600 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p>Processing and analyzing content...</p>
          </>
        ) : (
          <>
            <ScanSearch className="h-4 w-4 text-indigo-600" />
            <p>Finalizing document extraction...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoadingState;
