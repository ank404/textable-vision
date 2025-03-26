
import React from 'react';
import { ContentItem, TableData } from '../types';
import TableRenderer from './TableRenderer';

interface ContentRendererProps {
  content?: ContentItem[];
  fallbackText?: string;
  className?: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ 
  content, 
  fallbackText,
  className = '',
}) => {
  // If no content, display fallback text
  if (!content || content.length === 0) {
    if (fallbackText) {
      return (
        <div className={`animate-fade-in ${className}`}>
          <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed">{fallbackText}</pre>
        </div>
      );
    }
    return null;
  }

  // Sort content by position to maintain document order
  const sortedContent = [...content].sort((a, b) => {
    // Sort by page first
    if (a.position?.page !== b.position?.page) {
      return (a.position?.page || 0) - (b.position?.page || 0);
    }
    // Then by index within page
    return (a.position?.index || 0) - (b.position?.index || 0);
  });

  return (
    <div className={`space-y-6 animate-fade-in ${className}`}>
      {sortedContent.map((item, index) => {
        if (item.type === 'table' && item.headers && item.data) {
          const tableData: TableData = {
            headers: item.headers,
            data: item.data,
            position: item.position,
          };
          return (
            <div key={`table-${index}`} className="my-6 rounded-md border-l-4 border-indigo-500 pl-2">
              <p className="text-xs uppercase tracking-wider text-indigo-700 font-semibold mb-2">
                Table {item.position?.page ? `(Page ${item.position.page})` : ''}
              </p>
              <TableRenderer table={tableData} />
            </div>
          );
        } else if (item.type === 'text' && item.content) {
          return (
            <div key={`text-${index}`} className="document-text">
              {item.position?.page && (
                <div className="text-xs text-indigo-500 mb-1 font-medium">
                  Page {item.position.page}
                </div>
              )}
              <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed bg-white p-3 rounded-md border border-gray-100 shadow-sm">
                {item.content}
              </pre>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ContentRenderer;
