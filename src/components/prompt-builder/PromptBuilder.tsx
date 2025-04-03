
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

const PromptBuilder: React.FC = () => {
  const { toast } = useToast();
  const [promptText, setPromptText] = useState('');
  
  const handleGeneratePrompt = () => {
    // In a real app, this would generate a prompt from the selected files
    setPromptText(`Here is my codebase. Please help me understand it and suggest improvements:\n\n[Selected files will be inserted here automatically]`);
    
    toast({
      title: "Prompt generated",
      description: "The prompt has been generated with selected files.",
    });
  };
  
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
        description: "Generate a prompt first before copying.",
        variant: "destructive",
      });
    }
  };
  
  const handleDownload = () => {
    toast({
      title: "Feature in development",
      description: "Downloading prompts will be available in the next version.",
    });
  };
  
  // Calculate approximate token count
  const tokenCount = Math.floor(promptText.split(/\s+/).length * 1.3);
  
  return (
    <Card className="h-full">
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Prompt Builder</CardTitle>
          {promptText && (
            <div className="flex items-center mt-1">
              <Badge variant="secondary" className="text-xs">
                ~{tokenCount} tokens
              </Badge>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">  
          <Button 
            variant="default" 
            size="sm" 
            className="h-8"
            onClick={handleGeneratePrompt}
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            Generate
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8"
            onClick={handleCopyPrompt}
            disabled={!promptText}
          >
            <Copy className="h-3.5 w-3.5 mr-1" />
            Copy
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8"
            onClick={handleDownload}
            disabled={!promptText}
          >
            <Download className="h-3.5 w-3.5 mr-1" />
            Save
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <Textarea
          placeholder="Write your prompt here, or click 'Generate' to create a prompt from selected files..."
          className="min-h-[100px] w-full resize-none"
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
        />
      </CardContent>
    </Card>
  );
};

export default PromptBuilder;
