import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useRepositoryStore } from '@/store/repositoryStore';
import { countSelectedFiles } from './utils';
import FileTree from './FileTree';
import FileExplorerHeader from './FileExplorerHeader';
import FileExplorerToolbar from './FileExplorerToolbar';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const FileExplorer: React.FC = () => {
  // Get state and actions from Zustand store
  const fileStructure = useRepositoryStore((state) => state.fileStructure);
  const toggleItemExpansion = useRepositoryStore((state) => state.toggleItemExpansion);
  const toggleItemSelection = useRepositoryStore((state) => state.toggleItemSelection);
  const clearAllSelections = useRepositoryStore((state) => state.clearAllSelections);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('');
  
  // Sort files based on criteria
  const sortedFiles = useMemo(() => {
    const sortFiles = (items) => {
      return [...items].sort((a, b) => {
        if (a.type === 'folder' && b.type !== 'folder') return -1;
        if (a.type !== 'folder' && b.type === 'folder') return 1;
        
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'size') return (a.size || '').localeCompare(b.size || '');
        if (sortBy === 'type') {
          const aExt = a.name.split('.').pop() || '';
          const bExt = b.name.split('.').pop() || '';
          return aExt.localeCompare(bExt);
        }
        return 0;
      }).map(item => {
        if (item.children) {
          return {...item, children: sortFiles(item.children)};
        }
        return item;
      });
    };
    
    return sortFiles(fileStructure);
  }, [fileStructure, sortBy]);
  
  // Filter files based on criteria
  const filteredFiles = useMemo(() => {
    if (!filterBy && !searchTerm) return sortedFiles;
    
    const filterFiles = (items) => {
      return items.filter(item => {
        let matchesFilter = true;
        let matchesSearch = true;
        
        // Apply extension filter
        if (filterBy && item.type === 'file') {
          matchesFilter = item.name.endsWith(filterBy);
        }
        
        // Apply search term
        if (searchTerm) {
          matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        }
        
        // Keep folders if they have matching children
        if (item.type === 'folder' && item.children) {
          const filteredChildren = filterFiles(item.children);
          if (filteredChildren.length > 0) {
            return true;
          }
        }
        
        return matchesFilter && matchesSearch;
      }).map(item => {
        if (item.type === 'folder' && item.children) {
          return {...item, children: filterFiles(item.children), expanded: true};
        }
        return item;
      });
    };
    
    return filterFiles(sortedFiles);
  }, [sortedFiles, filterBy, searchTerm]);
  
  // Calculate selected files based on store state
  const selectedFiles = countSelectedFiles(fileStructure);
  
  return (
    <Card className="h-full">
      <FileExplorerToolbar
        onClearSelection={clearAllSelections}
        onSortChange={setSortBy}
        onFilterChange={setFilterBy}
      />
      <div className="px-2 py-1.5">
        <div className="relative">
          <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files"
            className="pl-8 h-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <CardContent className="p-0 overflow-auto h-[calc(100%-82px)]">
        <div className="min-h-[200px] max-h-[calc(100vh-15rem)] overflow-y-auto">
          <FileTree
            items={filteredFiles}
            searchTerm=""
            toggleExpand={toggleItemExpansion}
            toggleSelect={toggleItemSelection}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FileExplorer;
