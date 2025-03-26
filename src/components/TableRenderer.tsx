
import React from 'react';
import { TableData } from '../types';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface TableRendererProps {
  table: TableData;
  className?: string;
}

const TableRenderer: React.FC<TableRendererProps> = ({ table, className = '' }) => {
  if (!table.headers || !table.data || table.data.length === 0) {
    return null;
  }

  return (
    <div className={`overflow-x-auto my-4 rounded-lg border border-indigo-200 shadow-sm bg-white ${className}`}>
      <Table>
        <TableHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
          <TableRow>
            {table.headers.map((header, index) => (
              <TableHead key={`header-${index}`} className="px-4 py-3 text-indigo-700 font-medium">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.data.map((row, rowIndex) => (
            <TableRow 
              key={`row-${rowIndex}`} 
              className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-indigo-50/30'}
            >
              {table.headers.map((header, cellIndex) => (
                <TableCell key={`cell-${rowIndex}-${cellIndex}`} className="px-4 py-3">
                  {row[header] || ''}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableRenderer;
