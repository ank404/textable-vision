
import React, { useEffect } from 'react';
import DocumentUploader from '../components/DocumentUploader';
import ContentRenderer from '../components/ContentRenderer';
import ResultControls from '../components/ResultControls';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { useOcrProcessor } from '../hooks/useOcrProcessor';
import { DocumentFile } from '../types';
import { FileSearch, ScanSearch, Text, Table, FileType2 } from 'lucide-react';

const Index = () => {
  const { isLoading, error, data, file, uploadProgress, processFile, clearData } = useOcrProcessor();

  const handleFileAccepted = (file: DocumentFile) => {
    processFile(file);
  };

  // Log data for debugging
  useEffect(() => {
    if (data) {
      console.log('Processed data:', data);
    }
  }, [data]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-indigo-100/60 shadow-sm">
        <div className="container py-4 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-blue-600 bg-clip-text text-transparent">
              <span className="flex items-center">
                <ScanSearch className="h-6 w-6 mr-2 text-indigo-600" />
                OCR Document Processor
              </span>
            </h1>
            {data && (
              <button 
                className="px-3 py-1.5 rounded-lg border border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-colors text-sm font-medium"
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
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-indigo-200/50">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4 text-white shadow-lg shadow-indigo-500/30">
                      <FileSearch className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-indigo-700 to-blue-600 bg-clip-text text-transparent">
                      Extract Text & Tables from Documents
                    </h2>
                    <p className="text-slate-600 max-w-lg mx-auto">
                      Upload any document to automatically extract text and tables with advanced OCR processing
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-1 rounded-xl shadow-lg shadow-indigo-600/20">
                    <div className="bg-white rounded-lg p-1">
                      <DocumentUploader 
                        onFileAccepted={handleFileAccepted}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-sm">
                      <div className="rounded-full bg-blue-500/10 p-2 w-10 h-10 mx-auto mb-3 flex items-center justify-center">
                        <Text className="h-5 w-5 text-blue-600" />
                      </div>
                      <p className="text-sm font-semibold text-blue-800">Extract Formatted Text</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 shadow-sm">
                      <div className="rounded-full bg-indigo-500/10 p-2 w-10 h-10 mx-auto mb-3 flex items-center justify-center">
                        <Table className="h-5 w-5 text-indigo-600" />
                      </div>
                      <p className="text-sm font-semibold text-indigo-800">Identify Tables</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 shadow-sm">
                      <div className="rounded-full bg-purple-500/10 p-2 w-10 h-10 mx-auto mb-3 flex items-center justify-center">
                        <FileType2 className="h-5 w-5 text-purple-600" />
                      </div>
                      <p className="text-sm font-semibold text-purple-800">Preserve Formatting</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-sm">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse mr-1"></span>
                    Supports PDF, images, and scanned documents
                  </div>
                </div>
              </div>
            )}
            
            {isLoading && (
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-blue-200 animate-fade-in">
                <LoadingState progress={uploadProgress} />
              </div>
            )}

            {error && (
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-rose-200 animate-fade-in">
                <ErrorState 
                  message={error} 
                  onRetry={() => file && processFile(file)} 
                />
              </div>
            )}

            {data && !isLoading && !error && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-indigo-200/50">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                    <div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-blue-600 bg-clip-text text-transparent">Extracted Content</h2>
                      <p className="text-sm text-slate-500">Text and tables extracted from your document</p>
                    </div>
                    <ResultControls data={data} onClear={clearData} />
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6 border border-indigo-100/60 max-h-[60vh] overflow-y-auto">
                    {data.content && data.content.length > 0 ? (
                      <ContentRenderer 
                        content={data.content} 
                        fallbackText={data.extracted_text}
                      />
                    ) : data.extracted_text ? (
                      <div className="animate-fade-in">
                        <pre className="document-text whitespace-pre-wrap">{data.extracted_text}</pre>
                      </div>
                    ) : (
                      <div className="text-center p-8 text-gray-500">
                        <FileType2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p>No content was extracted from this document.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <button 
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:from-indigo-700 hover:to-blue-700 shadow-indigo-500/30"
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

      <footer className="border-t border-indigo-100/40 py-6 bg-white/50 backdrop-blur-sm">
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
