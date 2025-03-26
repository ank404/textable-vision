
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center h-60 text-center animate-fade-in">
      <div className="rounded-full bg-rose-100 p-4 mb-4">
        <AlertTriangle className="h-8 w-8 text-rose-600" />
      </div>
      <h3 className="text-xl font-bold text-rose-700 mb-2">Processing Error</h3>
      <p className="text-slate-600 max-w-md mb-6 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
        >
          <RefreshCw className="h-4 w-4 mr-2 animate-spin-slow" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
