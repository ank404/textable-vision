
import React from 'react';
import { AlertTriangle, RefreshCw, HelpCircle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  const isConnectivityError = message.includes('network') || 
                              message.includes('ECONNREFUSED') ||
                              message.includes('timeout');
  
  return (
    <div className="flex flex-col items-center justify-center h-60 text-center animate-fade-in">
      <div className="rounded-full bg-rose-100 p-4 mb-4 shadow-md shadow-rose-200/50">
        <AlertTriangle className="h-8 w-8 text-rose-600" />
      </div>
      <h3 className="text-xl font-bold text-rose-700 mb-2">Processing Error</h3>
      <p className="text-slate-600 max-w-md mb-6 leading-relaxed">
        {message}
      </p>
      
      {isConnectivityError && (
        <div className="mb-5 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm max-w-md">
          <div className="flex items-center mb-2">
            <HelpCircle className="h-4 w-4 mr-2" />
            <span className="font-semibold">Connection Issue</span>
          </div>
          <p className="text-left">
            It appears the API server may not be running or accessible. Make sure your backend is online and accepting connections from your browser's origin.
          </p>
        </div>
      )}
      
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
