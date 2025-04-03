
import React, { useState } from 'react';
import { Folder, FileText, ChevronDown, ChevronRight, Code, FileJson } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  selected?: boolean;
  expanded?: boolean;
  children?: FileItem[];
}

// Mock file structure data with proper typing
const mockFileStructure: FileItem[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    expanded: true,
    children: [
      {
        id: '2',
        name: 'components',
        type: 'folder',
        expanded: true,
        children: [
          { id: '3', name: 'Button.tsx', type: 'file', size: '2.4KB', selected: false },
          { id: '4', name: 'Card.tsx', type: 'file', size: '3.1KB', selected: false }
        ]
      },
      {
        id: '5',
        name: 'utils',
        type: 'folder',
        expanded: false,
        children: [
          { id: '6', name: 'helpers.ts', type: 'file', size: '1.2KB', selected: false },
          { id: '7', name: 'format.ts', type: 'file', size: '0.8KB', selected: false }
        ]
      },
      { id: '8', name: 'App.tsx', type: 'file', size: '4.2KB', selected: true },
      { id: '9', name: 'index.tsx', type: 'file', size: '0.5KB', selected: false }
    ]
  },
  {
    id: '10',
    name: 'public',
    type: 'folder',
    expanded: false,
    children: [
      { id: '11', name: 'index.html', type: 'file', size: '1.8KB', selected: false },
      { id: '12', name: 'favicon.ico', type: 'file', size: '4.3KB', selected: false }
    ]
  }
];

const FileExplorer: React.FC = () => {
  const [fileStructure, setFileStructure] = useState<FileItem[]>(mockFileStructure);
  const [searchTerm, setSearchTerm] = useState('');
  
  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.tsx') || fileName.endsWith('.jsx')) {
      return <Code className="h-4 w-4 text-blue-500" />;
    } else if (fileName.endsWith('.ts') || fileName.endsWith('.js')) {
      return <FileText className="h-4 w-4 text-yellow-500" />;
    } else if (fileName.endsWith('.json')) {
      return <FileJson className="h-4 w-4 text-green-500" />;
    }
    return <FileText className="h-4 w-4 text-gray-500" />;
  };
  
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
  
  const renderFileTree = (items: FileItem[], level = 0) => {
    return items.map(item => {
      // Filter by search term
      if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        // Still render if it's a folder that might contain matches
        if (item.type !== 'folder' || !item.children) {
          return null;
        }
        
        // Check if any children match the search
        const childMatches = renderFileTree(item.children, level + 1).filter(Boolean);
        if (childMatches.length === 0) {
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
              {renderFileTree(item.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  const selectedFiles = countSelectedFiles(fileStructure);
  
  return (
    <Card className="h-full">
      <CardHeader className="py-3 px-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Files</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {selectedFiles} selected
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Code className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter by code files</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <Input
          placeholder="Search files..."
          className="mt-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </CardHeader>
      <CardContent className="p-0 overflow-auto">
        <div className="min-h-[200px] max-h-[calc(100vh-15rem)] overflow-y-auto">
          {renderFileTree(fileStructure)}
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to count selected files
function countSelectedFiles(items: FileItem[]): number {
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

export default FileExplorer;
