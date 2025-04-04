import React from 'react';
import { ArrowUpDown, LayoutList, LayoutGrid, FolderTree } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface SelectedFilesHeaderProps {
  fileCount: number;
  totalTokens: number;
  apiCalls: number;
  apiTokens: number;
  viewMode: 'list' | 'grid' | 'tree';
  onViewModeChange: (mode: 'list' | 'grid' | 'tree') => void;
  onSortChange: (sortBy: string) => void;
}

const SelectedFilesHeader: React.FC<SelectedFilesHeaderProps> = ({
  fileCount,
  totalTokens,
  apiCalls,
  apiTokens,
  viewMode,
  onViewModeChange,
  onSortChange
}) => {
  return (
    <div className="flex justify-between items-center px-2 py-1">
      <div className="flex items-center gap-2">
        <span className="font-medium text-sm">Selected Files</span>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ArrowUpDown className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onSortChange('name')}>By Name</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange('size')}>By Size</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange('tokens')}>By Tokens</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex bg-secondary/30 rounded-sm">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-7 w-7 ${viewMode === 'list' ? 'bg-background' : ''}`}
            onClick={() => onViewModeChange('list')}
          >
            <LayoutList className="h-3.5 w-3.5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-7 w-7 ${viewMode === 'grid' ? 'bg-background' : ''}`}
            onClick={() => onViewModeChange('grid')}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-7 w-7 ${viewMode === 'tree' ? 'bg-background' : ''}`}
            onClick={() => onViewModeChange('tree')}
          >
            <FolderTree className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <Badge variant="outline" className="text-xs bg-transparent">
          {fileCount} files
        </Badge>
        <Badge variant="outline" className="text-xs bg-transparent">
          ~{totalTokens.toLocaleString()} tokens
        </Badge>
        <Badge variant="outline" className="text-xs bg-transparent">
          {apiCalls} API calls
        </Badge>
        <Badge variant="outline" className="text-xs bg-transparent">
          ~{apiTokens.toLocaleString()} tokens
        </Badge>
      </div>
    </div>
  );
};

export default SelectedFilesHeader;
