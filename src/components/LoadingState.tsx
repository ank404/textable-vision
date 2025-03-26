
import React from 'react';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Processing document...'
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-60 text-center animate-fade-in">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-t-2 border-primary/30 animate-pulse-subtle"></div>
      </div>
      <h3 className="text-lg font-medium mb-2">{message}</h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        This may take a moment depending on document complexity
      </p>
    </div>
  );
};

export default LoadingState;
