
import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useRepositoryStore } from '@/store/repositoryStore';
import { FileItem } from './types';
import { getFileIcon } from './utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import FilePreviewModal from './FilePreviewModal';
import SelectedFilesHeader from './SelectedFilesHeader';

const SelectedFiles: React.FC = () => {
  // Get file structure from store
  const fileStructure = useRepositoryStore((state) => state.fileStructure);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<{ name: string, content: string, tokenCount?: number } | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'tree'>('list');
  const [sortBy, setSortBy] = useState<string>('name');
  
  // Memoize the calculation of selected files
  const selectedFiles = useMemo(() => {
    const getSelected = (items: FileItem[]): FileItem[] => {
      let selected: FileItem[] = [];
      const findSelected = (fileItems: FileItem[]) => {
        for (const item of fileItems) {
          if (item.type === 'file' && item.selected) {
            // Add token count simulation for demo purposes
            selected.push({
              ...item,
              tokenCount: item.tokenCount || Math.floor(Math.random() * 3000) + 500,
              tokenPercentage: item.tokenPercentage || Math.floor(Math.random() * 15) + 3
            });
          }
          if (item.children) {
            findSelected(item.children);
          }
        }
      };
      findSelected(items);
      
      // Sort files based on the sortBy criteria
      return selected.sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'size') return (a.size || '').localeCompare(b.size || '');
        if (sortBy === 'tokens') return (b.tokenCount || 0) - (a.tokenCount || 0);
        return 0;
      });
    };
    return getSelected(fileStructure);
  }, [fileStructure, sortBy]);

  const handleFileClick = (file: FileItem) => {
    setSelectedFileId(file.id);
    
    // Mock content - in a real app, you would fetch the actual file content
    const mockContent = `// Mock content for ${file.name}\n// Path: ${file.path}\n\nfunction placeholder() {\n  console.log("File content loading not implemented yet.");\n}`; 
    
    setPreviewFile({ 
      name: file.name, 
      content: mockContent,
      tokenCount: file.tokenCount
    });
    setPreviewModalOpen(true);
  };

  const handleCloseModal = () => {
    setPreviewModalOpen(false);
  };
  
  // Calculate totals for display
  const totalTokens = useMemo(() => 
    selectedFiles.reduce((sum, file) => sum + (file.tokenCount || 0), 0), 
  [selectedFiles]);
  
  // Render files based on the selected view mode
  const renderFiles = () => {
    if (viewMode === 'grid') {
      return (
        <div className="grid grid-cols-2 gap-2 p-2">
          {selectedFiles.map((file) => (
            <div
              key={file.id}
              className="flex flex-col p-2 rounded-md bg-secondary/20 cursor-pointer hover:bg-secondary/40"
              onClick={() => handleFileClick(file)}
            >
              <div className="flex items-center mb-2">
                <div className="mr-2">{getFileIcon(file.name)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{file.name}</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-auto">
                ~{file.tokenCount?.toLocaleString()} tokens ({file.tokenPercentage}%)
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    if (viewMode === 'tree') {
      // Group files by directory
      const filesByDir: Record<string, FileItem[]> = {};
      
      selectedFiles.forEach(file => {
        const pathParts = file.path.split('/');
        const dir = pathParts.length > 1 ? pathParts[0] : 'root';
        
        if (!filesByDir[dir]) {
          filesByDir[dir] = [];
        }
        filesByDir[dir].push(file);
      });
      
      return (
        <div className="space-y-2 p-2">
          {Object.entries(filesByDir).map(([dir, files]) => (
            <div key={dir} className="bg-secondary/10 rounded-md overflow-hidden">
              <div className="px-3 py-1 bg-secondary/30 text-sm font-medium">{dir}</div>
              <div>
                {files.map(file => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-secondary/30"
                    onClick={() => handleFileClick(file)}
                  >
                    <div className="flex items-center">
                      <div className="mr-2">{getFileIcon(file.name)}</div>
                      <span className="text-sm truncate">{file.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ~{file.tokenCount?.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    // Default list view
    return (
      <div className="space-y-1 p-2">
        {selectedFiles.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/30 cursor-pointer"
            onClick={() => handleFileClick(file)}
          >
            <div className="flex items-center flex-1 min-w-0">
              <div className="mr-2">{getFileIcon(file.name)}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate">{file.name}</div>
                {file.path && (
                  <div className="text-xs text-muted-foreground truncate">{file.path}</div>
                )}
              </div>
            </div>
            <div className="text-xs text-muted-foreground ml-4">
              ~{file.tokenCount?.toLocaleString()} ({file.tokenPercentage}%)
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <>
      <Card className="h-full bg-background">
        <SelectedFilesHeader 
          fileCount={selectedFiles.length}
          totalTokens={totalTokens}
          apiCalls={selectedFiles.length}
          apiTokens={Math.floor(totalTokens * 0.7)}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onSortChange={setSortBy}
        />
        <CardContent className="p-0 h-[calc(100%-36px)] overflow-hidden">
          <ScrollArea className="h-full">
            {selectedFiles.length > 0 ? (
              renderFiles()
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No files selected. Select files from the file explorer.
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {previewFile && (
        <FilePreviewModal
          isOpen={previewModalOpen}
          onClose={handleCloseModal}
          fileName={previewFile.name}
          content={previewFile.content}
          tokenCount={previewFile.tokenCount}
        />
      )}
    </>
  );
};

export default SelectedFiles;
