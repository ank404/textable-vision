
import React from 'react';
import DocumentUploader from '../components/DocumentUploader';
import ContentRenderer from '../components/ContentRenderer';
import ResultControls from '../components/ResultControls';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { useOcrProcessor } from '../hooks/useOcrProcessor';
import { DocumentFile } from '../types';
import { FileSearch, ScanSearch, Text, Table } from 'lucide-react';

const Index = () => {
  const { isLoading, error, data, file, uploadProgress, processFile, clearData } = useOcrProcessor();

  const handleFileAccepted = (file: DocumentFile) => {
    processFile(file);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100/60 shadow-sm">
        <div className="container py-4 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              <span className="flex items-center">
                <ScanSearch className="h-6 w-6 mr-2 text-blue-600" />
                OCR Document Processor
              </span>
            </h1>
            {data && (
              <button 
                className="btn-ghost text-sm"
                onClick={clearData}
              >
                Process New Document
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            {!data && !isLoading && !error && (
              <div className="animate-fade-in space-y-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-4">
                      <FileSearch className="h-8 w-8 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                      Extract Text & Tables from Documents
                    </h2>
                    <p className="text-slate-600 max-w-lg mx-auto">
                      Upload any document to automatically extract text and tables with advanced OCR processing
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-1 rounded-xl">
                    <DocumentUploader 
                      onFileAccepted={handleFileAccepted}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-lg bg-blue-50">
                      <Text className="h-5 w-5 mb-2 mx-auto text-blue-600" />
                      <p className="text-sm font-medium text-slate-700">Extract Formatted Text</p>
                    </div>
                    <div className="p-4 rounded-lg bg-indigo-50">
                      <Table className="h-5 w-5 mb-2 mx-auto text-indigo-600" />
                      <p className="text-sm font-medium text-slate-700">Identify Tables</p>
                    </div>
                    <div className="p-4 rounded-lg bg-purple-50">
                      <svg className="h-5 w-5 mb-2 mx-auto text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                      </svg>
                      <p className="text-sm font-medium text-slate-700">Preserve Formatting</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center text-sm text-slate-500">
                  <p>Supports PDF, images, and scanned documents</p>
                </div>
              </div>
            )}
            
            {isLoading && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 animate-fade-in">
                <LoadingState progress={uploadProgress} />
              </div>
            )}

            {error && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-rose-100 animate-fade-in">
                <ErrorState 
                  message={error} 
                  onRetry={() => file && processFile(file)} 
                />
              </div>
            )}

            {data && !isLoading && !error && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                    <div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">Extracted Content</h2>
                      <p className="text-sm text-slate-500">Text and tables extracted from your document</p>
                    </div>
                    <ResultControls data={data} onClear={clearData} />
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6 border border-blue-100/60 max-h-[60vh] overflow-y-auto">
                    <ContentRenderer 
                      content={data.content} 
                      fallbackText={data.extracted_text}
                    />
                  </div>
                </div>

                <div className="text-center">
                  <button 
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-indigo-700"
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

      <footer className="border-t border-blue-100/40 py-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-500">
            OCR Document Processor — Extract text and tables with precision
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
