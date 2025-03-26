
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
          <pre className="document-text">{fallbackText}</pre>
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
    <div className={`space-y-4 animate-fade-in ${className}`}>
      {sortedContent.map((item, index) => {
        if (item.type === 'table' && item.headers && item.data) {
          const tableData: TableData = {
            headers: item.headers,
            data: item.data,
            position: item.position,
          };
          return (
            <div key={`table-${index}`} className="my-6">
              <TableRenderer table={tableData} />
            </div>
          );
        } else if (item.type === 'text' && item.content) {
          return (
            <pre key={`text-${index}`} className="document-text">
              {item.content}
            </pre>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ContentRenderer;
