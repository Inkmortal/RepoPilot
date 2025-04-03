import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useRepositoryStore } from '@/store/repositoryStore'; // Import Zustand store
// import { FileItem } from './types'; // Type is likely defined in store now or shared
// import { mockFileStructure } from './mockData'; // Remove mock data import
import { countSelectedFiles } from './utils'; // Keep utils if still needed
import FileTree from './FileTree';
import FileExplorerHeader from './FileExplorerHeader';

const FileExplorer: React.FC = () => {
  // Get state and actions from Zustand store
  const fileStructure = useRepositoryStore((state) => state.fileStructure);
  const toggleItemExpansion = useRepositoryStore((state) => state.toggleItemExpansion);
  const toggleItemSelection = useRepositoryStore((state) => state.toggleItemSelection);

  // const [fileStructure, setFileStructure] = useState<FileItem[]>(mockFileStructure); // Remove local state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Remove local toggleExpand function, use store action instead
  // const toggleExpand = (id: string) => { ... };

  // Remove local toggleSelect function, use store action instead
  // const toggleSelect = (id: string) => { ... };

  // Calculate selected files based on store state
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
            items={fileStructure} // Use fileStructure from store
            searchTerm={searchTerm}
            toggleExpand={toggleItemExpansion} // Pass store action
            toggleSelect={toggleItemSelection} // Pass store action
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FileExplorer;
