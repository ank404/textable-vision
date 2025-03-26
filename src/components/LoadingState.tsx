
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Scan } from 'lucide-react';

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
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse-subtle flex items-center justify-center">
          <Scan className="h-8 w-8 text-primary animate-pulse" />
        </div>
      </div>
      
      <h3 className="text-xl font-medium mb-3">{message}</h3>
      
      <div className="w-full max-w-md mb-4">
        <Progress value={progress} className="h-2 bg-secondary/50">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </Progress>
        <p className="text-sm text-primary font-medium mt-2">{progress}% Complete</p>
      </div>
      
      <p className="text-sm text-muted-foreground max-w-xs">
        {progress < 100 
          ? "Uploading and analyzing your document..." 
          : "Nearly done! Extracting content from your document..."}
      </p>
    </div>
  );
};

export default LoadingState;
