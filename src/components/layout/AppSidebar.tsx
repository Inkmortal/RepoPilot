
import React from 'react';
import { 
  Sidebar, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader
} from '@/components/ui/sidebar';
import { 
  Code, 
  FileText, 
  Settings, 
  Terminal, 
  Workflow,
  Folder
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const menuItems = [
  {
    title: 'File Explorer',
    icon: Folder,
    active: true
  },
  {
    title: 'Code Map',
    icon: Workflow
  },
  {
    title: 'Prompt Builder',
    icon: Terminal
  },
  {
    title: 'Structured Diffing',
    icon: Code
  },
  {
    title: 'Settings',
    icon: Settings
  }
];

const AppSidebar: React.FC = () => {
  const { toast } = useToast();
  
  const handleMenuClick = (title: string) => {
    if (title !== 'File Explorer') {
      toast({
        title: "Feature in development",
        description: `${title} will be available in the next version.`,
      });
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center h-12 px-4 border-b">
        <div className="font-semibold">Navigation</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    className={item.active ? "bg-sidebar-accent" : ""}
                    onClick={() => handleMenuClick(item.title)}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel>Recent Files</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {['App.tsx', 'utils.ts', 'MainView.tsx'].map((file) => (
                <SidebarMenuItem key={file}>
                  <SidebarMenuButton>
                    <FileText className="mr-2 h-4 w-4" />
                    <span className="text-sm">{file}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
