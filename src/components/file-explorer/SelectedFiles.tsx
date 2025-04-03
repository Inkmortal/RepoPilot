
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockFileStructure } from './mockData';
import { countSelectedFiles } from './utils';
import { FileItem } from './types';
import { Badge } from '@/components/ui/badge';
import { getFileIcon } from './utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const SelectedFiles: React.FC = () => {
  // In a real app, this would be connected to the actual file selection state
  const [fileStructure] = useState<FileItem[]>(mockFileStructure);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  
  // Find all selected files
  const getSelectedFiles = (items: FileItem[]): FileItem[] => {
    let selected: FileItem[] = [];
    
    const findSelected = (fileItems: FileItem[]) => {
      for (const item of fileItems) {
        if (item.type === 'file' && item.selected) {
          selected.push(item);
        }
        if (item.children) {
          findSelected(item.children);
        }
      }
    };
    
    findSelected(items);
    return selected;
  };
  
  const selectedFiles = getSelectedFiles(fileStructure);
  const selectedCount = countSelectedFiles(fileStructure);
  
  return (
    <Card className="h-full">
      <CardHeader className="py-3 px-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Selected Files</CardTitle>
          <Badge variant="outline" className="text-xs">
            {selectedCount} files
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100%-56px)]">
          <div className="p-2">
            {selectedFiles.length > 0 ? (
              <div className="grid gap-2">
                {selectedFiles.map((file) => (
                  <div
                    key={file.id}
                    className={`flex items-center p-2 rounded-md cursor-pointer ${
                      selectedFileId === file.id ? 'bg-secondary' : 'hover:bg-secondary/50'
                    }`}
                    onClick={() => setSelectedFileId(file.id)}
                  >
                    <div className="mr-2">{getFileIcon(file.name)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{file.name}</div>
                      {file.size && (
                        <div className="text-xs text-muted-foreground">{file.size}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No files selected. Select files from the file explorer.
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SelectedFiles;
