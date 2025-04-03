
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import FileExplorer from '@/components/file-explorer/FileExplorer';
import CodeViewer from '@/components/code-viewer/CodeViewer';
import PromptBuilder from '@/components/prompt-builder/PromptBuilder';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Code, Terminal, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  return (
    <AppLayout>
      <div className="h-full p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-4">
          RepoPilot
          <span className="text-sm font-normal ml-2 text-muted-foreground">Intelligent prompts from your codebase</span>
        </h1>
        
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={25} minSize={20}>
            <FileExplorer />
          </ResizablePanel>
          
          <ResizableHandle />
          
          <ResizablePanel defaultSize={75}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={60} minSize={30}>
                <CodeViewer />
              </ResizablePanel>
              
              <ResizableHandle />
              
              <ResizablePanel defaultSize={40}>
                <PromptBuilder />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </AppLayout>
  );
};

export default Index;
