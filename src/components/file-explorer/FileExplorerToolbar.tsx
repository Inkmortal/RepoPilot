import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  FileIcon, 
  ArrowUpDown,
  FilterIcon, 
  XIcon, 
  RefreshCw 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FileExplorerToolbarProps {
  onClearSelection: () => void;
  onSortChange: (sortBy: string) => void;
  onFilterChange: (filter: string) => void;
}

const FileExplorerToolbar: React.FC<FileExplorerToolbarProps> = ({
  onClearSelection,
  onSortChange,
  onFilterChange
}) => {
  return (
    <div className="flex flex-wrap items-center sm:gap-2 gap-1 border-b border-border">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs py-0.5 px-1.5 h-6">
            <ArrowUpDown className="h-3 w-3" />
            <span>Sort</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onSortChange('name')}>By Name</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange('size')}>By Size</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange('type')}>By Type</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs py-0.5 px-1.5 h-6">
            <FilterIcon className="h-3 w-3" />
            <span>Filters</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onFilterChange('.ts')}>TypeScript Files</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange('.tsx')}>React Components</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange('.md')}>Markdown Files</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange('.json')}>JSON Files</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button variant="outline" size="sm" className="text-xs py-0.5 px-1.5 h-6" onClick={onClearSelection}>
        Clear
      </Button>
      
      <Button variant="ghost" size="icon" className="ml-1 h-6 w-6">
        <RefreshCw className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
};

export default FileExplorerToolbar;
