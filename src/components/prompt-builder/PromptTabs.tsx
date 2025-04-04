
import React from 'react';
import { Circle, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PromptTabType = 'instructions' | 'codeMap' | 'xmlWhole';

interface PromptTabProps {
  activeTab: PromptTabType;
  onTabChange: (tab: PromptTabType) => void;
}

const PromptTabs: React.FC<PromptTabProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex items-center mb-2">
      <div 
        className={cn(
          "flex items-center gap-2 px-3 py-1 cursor-pointer rounded-md", 
          activeTab === 'instructions' && "bg-secondary/40"
        )}
        onClick={() => onTabChange('instructions')}
      >
        <Circle className="w-4 h-4" />
        <span>Instructions</span>
      </div>
      
      <div 
        className={cn(
          "flex items-center gap-2 px-3 py-1 cursor-pointer rounded-md ml-2", 
          activeTab === 'codeMap' && "bg-secondary/40"
        )}
        onClick={() => onTabChange('codeMap')}
      >
        <Circle className="w-4 h-4" />
        <span>Code Map</span>
      </div>
      
      <div 
        className={cn(
          "flex items-center gap-2 px-3 py-1 cursor-pointer rounded-md ml-2", 
          activeTab === 'xmlWhole' && "bg-secondary/40"
        )}
        onClick={() => onTabChange('xmlWhole')}
      >
        <Circle className="w-4 h-4" />
        <span>XML Whole</span>
      </div>
      
      <div className="flex items-center px-3 py-1 cursor-pointer ml-2">
        <Plus className="w-4 h-4" />
      </div>
    </div>
  );
};

export default PromptTabs;
