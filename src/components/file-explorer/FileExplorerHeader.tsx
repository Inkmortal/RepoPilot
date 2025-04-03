
import React from 'react';
import { Code } from 'lucide-react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

interface FileExplorerHeaderProps {
  selectedFiles: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const FileExplorerHeader: React.FC<FileExplorerHeaderProps> = ({ 
  selectedFiles, 
  searchTerm, 
  setSearchTerm 
}) => {
  return (
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
  );
};

export default FileExplorerHeader;
