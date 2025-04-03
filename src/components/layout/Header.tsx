import React from 'react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Folder, Settings, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRepositoryStore } from '@/store/repositoryStore';

// Define the type for the exposed Electron API
declare global {
  interface Window {
    electronAPI: {
      openDirectoryDialog: () => Promise<{ canceled?: boolean; path?: string; structure?: any[]; error?: string }>;
    }
  }
}

const Header: React.FC = () => {
  const { toast } = useToast();
  const loadRepository = useRepositoryStore((state) => state.loadRepository);
  
  const handleOpenRepo = async () => {
    if (window.electronAPI) {
      try {
        const result = await window.electronAPI.openDirectoryDialog();
        if (result.canceled) {
          console.log('Directory selection canceled.');
          return;
        }
        if (result.error) {
          console.error('Error opening directory:', result.error);
          toast({
            variant: "destructive",
            title: "Error Opening Directory",
            description: result.error,
          });
          return;
        }
        if (result.path && result.structure) {
          loadRepository(result.path, result.structure);
          toast({
            title: "Repository Loaded",
            description: `Loaded repository from: ${result.path}`,
          });
        } else {
          // Handle unexpected case where result is neither canceled nor has path/structure
           console.error('Unexpected result from openDirectoryDialog:', result);
            toast({
                variant: "destructive",
                title: "Error Loading Repository",
                description: "Received an unexpected response after selecting directory.",
            });
        }
      } catch (error: any) {
        console.error('Failed to invoke directory dialog:', error);
        toast({
          variant: "destructive",
          title: "IPC Error",
          description: error.message || "Failed to communicate with the main process.",
        });
      }
    } else {
      console.error('Electron API not available. Ensure preload script is loaded.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Electron functionality is not available.",
      });
    }
  };

  return (
    <header className="bg-card border-b border-border h-12 flex items-center px-4 justify-between">
      <div className="flex items-center">
        <SidebarTrigger />
        <div className="ml-4 font-semibold text-lg">RepoPilot</div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center"
          onClick={handleOpenRepo}
        >
          <Folder className="mr-2 h-4 w-4" />
          Open Repo
        </Button>
        
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
