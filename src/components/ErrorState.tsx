
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center h-60 text-center animate-fade-in">
      <div className="rounded-full bg-destructive/10 p-3 mb-3">
        <AlertTriangle className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="text-lg font-medium mb-2">Processing Error</h3>
      <p className="text-sm text-muted-foreground max-w-xs mb-4">
        {message}
      </p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="btn-secondary"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
