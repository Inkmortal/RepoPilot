
import React from 'react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Folder, Settings, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Header: React.FC = () => {
  const { toast } = useToast();
  
  const handleOpenRepo = () => {
    toast({
      title: "Feature in development",
      description: "Opening repositories will be available in the next version.",
    });
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
