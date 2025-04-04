import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import FileExplorer from '@/components/file-explorer/FileExplorer';
import PromptBuilder from '@/components/prompt-builder/PromptBuilder';
import ApplyPage from '@/components/apply-page/ApplyPage';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import SelectedFiles from '@/components/file-explorer/SelectedFiles';
import NavigationTabs from '@/components/layout/NavigationTabs';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'compose' | 'apply'>('compose');
  const { toast } = useToast();
  
  const handleCopy = () => {
    const promptContent = "Example prompt content..."; 
    navigator.clipboard.writeText(promptContent).then(() => {
      toast({
        title: "Prompt copied",
        description: "The prompt has been copied to your clipboard."
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Could not copy prompt to clipboard."
      });
    });
  };

  return (
    <AppLayout>
      <div className="h-full flex flex-col">
        <div className="flex-1 flex overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="flex-1">
            <ResizablePanel defaultSize={28} minSize={28} className="bg-muted/20">
              <FileExplorer />
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={72}>
              <div className="h-full flex flex-col">
                <NavigationTabs active={activeTab} onTabChange={setActiveTab} />
                
                <ResizablePanelGroup direction="vertical" className="flex-1">
                  <ResizablePanel defaultSize={activeTab === 'compose' ? 40 : 100} >
                    <div className="flex-1 min-h-0 h-full p-4">
                      <div className={cn("h-full", activeTab !== 'compose' && 'hidden')}>
                        <PromptBuilder />
                      </div>
                      <div className={cn("h-full", activeTab !== 'apply' && 'hidden')}>
                        <ApplyPage />
                      </div>
                    </div>
                  </ResizablePanel>
                  
                  {activeTab === 'compose' && (
                    <>
                      <ResizableHandle withHandle />
                      <ResizablePanel defaultSize={60} minSize={20}>
                        <div className="h-full flex flex-col">
                          <div className="flex-1 min-h-0">
                            <SelectedFiles />
                          </div>
                          
                          <div className="border-t border-border p-2 flex items-center justify-between flex-shrink-0">
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
                    </>
                  )}
                </ResizablePanelGroup>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
