
import React from 'react';
import { FileItem } from './types';
import { Folder, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { getFileIcon } from './utils';

interface FileTreeProps {
  items: FileItem[];
  level?: number;
  searchTerm: string;
  toggleExpand: (id: string) => void;
  toggleSelect: (id: string) => void;
}

const FileTree: React.FC<FileTreeProps> = ({ 
  items, 
  level = 0, 
  searchTerm, 
  toggleExpand, 
  toggleSelect 
}) => {
  return items.map(item => {
    // Filter by search term
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      // Still render if it's a folder that might contain matches
      if (item.type !== 'folder' || !item.children) {
        return null;
      }
      
      // Check if any children match the search
      const childrenComponents = (
        <FileTree
          items={item.children}
          level={level + 1}
          searchTerm={searchTerm}
          toggleExpand={toggleExpand}
          toggleSelect={toggleSelect}
        />
      );
      
      // Filter out null elements and check if there are any valid children
      const hasMatchingChildren = React.Children.toArray(childrenComponents).some(child => child !== null);
      
      if (!hasMatchingChildren) {
        return null;
      }
    }
    
    return (
      <div key={item.id} className="select-none">
        <div 
          className={`flex items-center py-1 px-2 rounded hover:bg-secondary ${
            item.selected ? 'bg-primary/10' : ''
          }`}
          style={{ paddingLeft: `${(level * 12) + 8}px` }}
        >
          {item.type === 'folder' ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0 mr-1"
              onClick={() => toggleExpand(item.id)}
            >
              {item.expanded ? 
                <ChevronDown className="h-3 w-3" /> : 
                <ChevronRight className="h-3 w-3" />
              }
            </Button>
          ) : (
            <div className="w-4 mr-1"></div>
          )}
          
          {item.type === 'folder' ? (
            <Folder className="h-4 w-4 text-yellow-500 mr-2" />
          ) : (
            <span className="mr-2">{getFileIcon(item.name)}</span>
          )}
          
          <span 
            className="text-sm flex-1"
            onClick={() => item.type === 'file' && toggleSelect(item.id)}
          >
            {item.name}
          </span>
          
          {item.size && (
            <span className="text-xs text-muted-foreground">{item.size}</span>
          )}
          
          {item.type === 'file' && (
            <Checkbox 
              checked={item.selected} 
              className="ml-2 h-3 w-3"
              onCheckedChange={() => toggleSelect(item.id)}
            />
          )}
        </div>
        
        {item.type === 'folder' && item.expanded && item.children && (
          <div>
            <FileTree
              items={item.children}
              level={level + 1}
              searchTerm={searchTerm}
              toggleExpand={toggleExpand}
              toggleSelect={toggleSelect}
            />
          </div>
        )}
      </div>
    );
  });
};

export default FileTree;
