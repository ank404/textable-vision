
import React, { useState } from 'react';
import DocumentUploader from '../components/DocumentUploader';
import ContentRenderer from '../components/ContentRenderer';
import ResultControls from '../components/ResultControls';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { useOcrProcessor } from '../hooks/useOcrProcessor';
import { DocumentFile } from '../types';

const Index = () => {
  const { isLoading, error, data, file, processFile, clearData } = useOcrProcessor();

  const handleFileAccepted = (file: DocumentFile) => {
    processFile(file);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass sticky top-0 z-50 border-b border-border/40">
        <div className="container py-4 mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-medium">
            OCR Document Processor
          </h1>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {!data && !isLoading && !error && (
              <div className="animate-fade-in space-y-6">
                <div className="glass-darker rounded-2xl p-8">
                  <h2 className="text-xl font-medium mb-6 text-center">
                    Upload a document to extract text and tables
                  </h2>
                  <DocumentUploader 
                    onFileAccepted={handleFileAccepted}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>Supports PDF, images, and scanned documents</p>
                </div>
              </div>
            )}
            
            {isLoading && (
              <div className="glass-darker rounded-2xl p-8 animate-fade-in">
                <LoadingState />
              </div>
            )}

            {error && (
              <div className="glass-darker rounded-2xl p-8 animate-fade-in">
                <ErrorState 
                  message={error} 
                  onRetry={() => file && processFile(file)} 
                />
              </div>
            )}

            {data && !isLoading && !error && (
              <div className="space-y-6 animate-fade-in">
                <div className="glass-darker rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-xl font-medium">Results</h2>
                    <ResultControls data={data} onClear={clearData} />
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 border border-border/60 max-h-[60vh] overflow-y-auto">
                    <ContentRenderer 
                      content={data.content} 
                      fallbackText={data.extracted_text}
                    />
                  </div>
                </div>

                <div className="text-center">
                  <button 
                    className="btn-primary"
                    onClick={clearData}
                  >
                    Process Another Document
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            OCR Document Processor — Extract text and tables with precision
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
