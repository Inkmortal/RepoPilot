import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRepositoryStore } from '@/store/repositoryStore';
import { countSelectedFiles } from './utils';
import { FileItem } from './types';
import { Badge } from '@/components/ui/badge';
import { getFileIcon } from './utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import FilePreviewModal from './FilePreviewModal';

const SelectedFiles: React.FC = () => {
  // Get file structure from store
  const fileStructure = useRepositoryStore((state) => state.fileStructure);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<{ name: string, content: string } | null>(null);
  
  // Memoize the calculation of selected files
  const selectedFiles = useMemo(() => {
    const getSelected = (items: FileItem[]): FileItem[] => {
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
    return getSelected(fileStructure); // Calculate based on store data
  }, [fileStructure]); // Recalculate only when fileStructure changes

  const selectedCount = countSelectedFiles(fileStructure); // Count based on store data
  
  const handleFileClick = (file: FileItem) => {
    setSelectedFileId(file.id);
    
    // Mock content - in a real app, you would fetch the actual file content
    // TODO: Implement actual file content fetching via IPC
    const mockContent = `// Mock content for ${file.name}\n// Path: ${file.path}\n\nfunction placeholder() {\n  console.log("File content loading not implemented yet.");\n}`; 
    
    setPreviewFile({ 
      name: file.name, 
      content: mockContent 
    });
    setPreviewModalOpen(true);
  };

  const handleCloseModal = () => {
    setPreviewModalOpen(false);
  };
  
  return (
    <>
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
                      onClick={() => handleFileClick(file)}
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

      {previewFile && (
        <FilePreviewModal
          isOpen={previewModalOpen}
          onClose={handleCloseModal}
          fileName={previewFile.name}
          content={previewFile.content}
        />
      )}
    </>
  );
};

export default SelectedFiles;
