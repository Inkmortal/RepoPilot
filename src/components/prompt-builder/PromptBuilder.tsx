
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import PromptTabs, { PromptTabType } from './PromptTabs';
import PromptOptions from './PromptOptions';
import StoredPrompts from './StoredPrompts';

const PromptBuilder: React.FC = () => {
  const { toast } = useToast();
  const [promptText, setPromptText] = useState('');
  const [activeTab, setActiveTab] = useState<PromptTabType>('instructions');
  const [includeCodeMap, setIncludeCodeMap] = useState(false);
  const [editPromptType, setEditPromptType] = useState<'none' | 'diff' | 'full'>('none');
  
  // Calculate approximate token count
  const tokenCount = Math.floor(promptText.split(/\s+/).length * 1.3);
  
  const handleCopyPrompt = () => {
    if (promptText) {
      navigator.clipboard.writeText(promptText);
      toast({
        title: "Prompt copied",
        description: "The prompt has been copied to your clipboard.",
      });
    } else {
      toast({
        title: "No prompt to copy",
        description: "Write a prompt first before copying.",
        variant: "destructive",
      });
    }
  };
  
  const handleSelectStoredPrompt = (text: string) => {
    setPromptText(text);
    toast({
      title: "Prompt loaded",
      description: "The saved prompt has been loaded into the editor.",
    });
  };

  return (
    <Card className="h-full bg-background">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="p-2 flex items-center justify-between">
          <PromptTabs activeTab={activeTab} onTabChange={setActiveTab} />
          
          <div className="flex items-center">
            <StoredPrompts onSelectPrompt={handleSelectStoredPrompt} />
          </div>
        </div>
        
        <div className="px-4">
          <PromptOptions 
            includeCodeMap={includeCodeMap}
            setIncludeCodeMap={setIncludeCodeMap}
            editPromptType={editPromptType}
            setEditPromptType={setEditPromptType}
          />
        </div>
        
        <div className="flex-1 px-4 pb-4 min-h-0">
          <Textarea
            placeholder="Enter your instructions here..."
            className="h-full min-h-[100px] w-full resize-none bg-muted/20"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptBuilder;
