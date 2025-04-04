
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import FileExplorer from '@/components/file-explorer/FileExplorer';
import PromptBuilder from '@/components/prompt-builder/PromptBuilder';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import SelectedFiles from '@/components/file-explorer/SelectedFiles';
import NavigationTabs from '@/components/layout/NavigationTabs';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'compose' | 'apply'>('compose');
  const { toast } = useToast();
  
  const handleCopy = () => {
    toast({
      title: "Prompt copied",
      description: "The prompt has been copied to your clipboard."
    });
  };

  return (
    <AppLayout>
      <div className="h-full flex flex-col">
        <NavigationTabs active={activeTab} />
        
        <div className="flex-1 flex overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="flex-1">
            <ResizablePanel defaultSize={25} minSize={20} className="bg-muted/20">
              <FileExplorer />
            </ResizablePanel>
            
            <ResizableHandle />
            
            <ResizablePanel defaultSize={75}>
              <div className="h-full flex flex-col">
                <div className="flex-1 min-h-0">
                  <PromptBuilder />
                </div>
                
                <div className="h-[40%] min-h-[200px]">
                  <SelectedFiles />
                </div>
                
                <div className="border-t border-border p-2 flex items-center justify-between">
                  <div>
                    <Badge variant="secondary" className="text-xs">
                      Approx. Token Total: ~0.00k
                    </Badge>
                  </div>
                  <Button 
                    variant="default" 
                    size="sm"
                    className="gap-2"
                    onClick={handleCopy}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </Button>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
