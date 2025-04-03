
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Download, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { getFileIcon } from './utils';

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  content: string;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  isOpen,
  onClose,
  fileName,
  content,
}) => {
  const { toast } = useToast();
  
  // Calculate approximate token count
  const tokenCount = Math.floor(content.split(/\s+/).length * 1.3);
  const fileSize = `${(content.length / 1024).toFixed(1)}KB`;
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Code copied",
      description: "The code has been copied to your clipboard.",
    });
  };
  
  const handleDownload = () => {
    toast({
      title: "Feature in development",
      description: "Downloading files will be available in the next version.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="flex items-center gap-2">
              {getFileIcon(fileName)}
              <span>{fileName}</span>
            </DialogTitle>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="text-xs mr-2">
                {fileName.split('.').pop()?.toUpperCase()}
              </Badge>
              <span className="text-xs text-muted-foreground">{fileSize}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8"
              onClick={handleCopyCode}
            >
              <Copy className="h-3.5 w-3.5 mr-1" />
              Copy
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8"
              onClick={handleDownload}
            >
              <Download className="h-3.5 w-3.5 mr-1" />
              Download
            </Button>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        
        <div className="relative flex-1 mt-4">
          <ScrollArea className="h-full border rounded-md bg-muted/50">
            <pre className="p-4 text-sm">
              <code>{content}</code>
            </pre>
          </ScrollArea>
          <div className="absolute bottom-2 right-2">
            <Badge variant="secondary" className="text-xs">
              ~{tokenCount} tokens
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilePreviewModal;
