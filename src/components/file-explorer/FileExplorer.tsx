
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileItem } from './types';
import { mockFileStructure } from './mockData';
import { countSelectedFiles } from './utils';
import FileTree from './FileTree';
import FileExplorerHeader from './FileExplorerHeader';

const FileExplorer: React.FC = () => {
  const [fileStructure, setFileStructure] = useState<FileItem[]>(mockFileStructure);
  const [searchTerm, setSearchTerm] = useState('');
  
  const toggleExpand = (id: string) => {
    setFileStructure(prevStructure => {
      const updateNode = (items: FileItem[]): FileItem[] => {
        return items.map(item => {
          if (item.id === id) {
            return { ...item, expanded: !item.expanded };
          }
          if (item.children) {
            return { ...item, children: updateNode(item.children) };
          }
          return item;
        });
      };
      
      return updateNode(prevStructure);
    });
  };

  const toggleSelect = (id: string) => {
    setFileStructure(prevStructure => {
      const updateNode = (items: FileItem[]): FileItem[] => {
        return items.map(item => {
          if (item.id === id) {
            return { ...item, selected: !item.selected };
          }
          if (item.children) {
            return { ...item, children: updateNode(item.children) };
          }
          return item;
        });
      };
      
      return updateNode(prevStructure);
    });
  };

  const selectedFiles = countSelectedFiles(fileStructure);
  
  return (
    <Card className="h-full">
      <FileExplorerHeader 
        selectedFiles={selectedFiles}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <CardContent className="p-0 overflow-auto">
        <div className="min-h-[200px] max-h-[calc(100vh-15rem)] overflow-y-auto">
          <FileTree
            items={fileStructure}
            searchTerm={searchTerm}
            toggleExpand={toggleExpand}
            toggleSelect={toggleSelect}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FileExplorer;
