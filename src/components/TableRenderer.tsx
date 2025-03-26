
import React from 'react';
import { TableData } from '../types';

interface TableRendererProps {
  table: TableData;
  className?: string;
}

const TableRenderer: React.FC<TableRendererProps> = ({ table, className = '' }) => {
  if (!table.headers || !table.data || table.data.length === 0) {
    return null;
  }

  return (
    <div className={`overflow-x-auto my-4 rounded-lg border border-border ${className}`}>
      <table className="ocr-table" aria-label="Extracted table">
        <thead>
          <tr>
            {table.headers.map((header, index) => (
              <th key={`header-${index}`} scope="col" className="px-4 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.data.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {table.headers.map((header, cellIndex) => (
                <td key={`cell-${rowIndex}-${cellIndex}`} className="px-4 py-3">
                  {row[header] || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableRenderer;
