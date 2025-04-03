
import { FileItem } from './types';
import { Code, FileText, FileJson } from 'lucide-react';
import React from 'react';

export const getFileIcon = (fileName: string): React.ReactElement => {
  if (fileName.endsWith('.tsx') || fileName.endsWith('.jsx')) {
    return <Code className="h-4 w-4 text-blue-500" />;
  } else if (fileName.endsWith('.ts') || fileName.endsWith('.js')) {
    return <FileText className="h-4 w-4 text-yellow-500" />;
  } else if (fileName.endsWith('.json')) {
    return <FileJson className="h-4 w-4 text-green-500" />;
  }
  return <FileText className="h-4 w-4 text-gray-500" />;
};

// Helper function to count selected files
export function countSelectedFiles(items: FileItem[]): number {
  let count = 0;
  
  const countSelected = (fileItems: FileItem[]) => {
    for (const item of fileItems) {
      if (item.type === 'file' && item.selected) {
        count++;
      }
      if (item.children) {
        countSelected(item.children);
      }
    }
  };
  
  countSelected(items);
  return count;
}
