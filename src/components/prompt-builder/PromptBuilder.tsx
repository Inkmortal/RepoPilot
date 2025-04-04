import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from '@/components/ui/badge';
import StoredPrompts from './StoredPrompts';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const PromptBuilder: React.FC = () => {
  const { toast } = useToast();
  const [promptText, setPromptText] = useState('');
  const [includeCodeMap, setIncludeCodeMap] = useState(false);
  const [outputFormat, setOutputFormat] = useState<'whole' | 'diff'>('whole');
  const [selectedPromptTags, setSelectedPromptTags] = useState<string[]>([]);
  const [fileTreeMode, setFileTreeMode] = useState<'auto' | 'full' | 'selected' | 'none'>('full');
  const [onlyRootsWithSelected, setOnlyRootsWithSelected] = useState(true);
  const [codeMapUsage, setCodeMapUsage] = useState<'auto' | 'complete' | 'none'>('complete');

  // Descriptions for popover content
  const fileTreeDescriptions = {
    auto: 'Automatically determines the best file tree representation.',
    full: 'Complete file tree.',
    selected: 'Only includes the selected files and their parent directories.',
    none: 'Does not include a file tree.',
  };

  const codeMapUsageDescriptions = {
    auto: 'Automatically determines when to include code map definitions.',
    complete: 'Include code map definitions in the file tree.',
    none: 'Does not include code map definitions.',
  };

  const handleSelectStoredPrompt = (title: string) => {
    if (!selectedPromptTags.includes(title)) {
      setSelectedPromptTags([...selectedPromptTags, title]);
      toast({
        title: "Prompt tag added",
        description: `"${title}" tag added.`,
      });
    } else {
       toast({
        title: "Tag already added",
        variant: "destructive",
      });
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedPromptTags(selectedPromptTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Card className="h-full bg-background">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="p-2 border-b border-border flex flex-wrap items-center justify-between md:gap-4 gap-2 text-sm">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="include-codemap" 
                checked={includeCodeMap}
                onCheckedChange={(checked) => setIncludeCodeMap(Boolean(checked))} 
              />
              <Label htmlFor="include-codemap" className="font-medium">Include Code Map</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                    <Settings className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4 space-y-4">
                  <div className="space-y-2">
                    <Label className="font-semibold">File Tree</Label>
                    <RadioGroup
                      value={fileTreeMode}
                      onValueChange={(value: 'auto' | 'full' | 'selected' | 'none') => setFileTreeMode(value)}
                      className="flex space-x-1 bg-muted p-1 rounded-md"
                    >
                      {(['auto', 'full', 'selected', 'none'] as const).map((mode) => (
                        <Label
                          key={mode}
                          htmlFor={`filetree-${mode}`}
                          className={`flex-1 text-center text-xs px-2 py-1 rounded-sm cursor-pointer ${
                            fileTreeMode === mode ? 'bg-background shadow-sm' : 'hover:bg-muted-foreground/20'
                          }`}
                        >
                          <RadioGroupItem value={mode} id={`filetree-${mode}`} className="sr-only" />
                          {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </Label>
                      ))}
                    </RadioGroup>
                    <p className="text-xs text-muted-foreground px-1">
                      {fileTreeDescriptions[fileTreeMode]}
                    </p>
                    {fileTreeMode === 'full' && (
                      <div className="flex items-center space-x-2 pl-1">
                        <Checkbox 
                          id="only-roots" 
                          checked={onlyRootsWithSelected} 
                          onCheckedChange={(checked) => setOnlyRootsWithSelected(Boolean(checked))} 
                        />
                        <Label htmlFor="only-roots" className="text-xs font-normal">
                          Only include roots with selected files
                        </Label>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="font-semibold">Code Map Usage</Label>
                    <RadioGroup
                      value={codeMapUsage}
                      onValueChange={(value: 'auto' | 'complete' | 'none') => setCodeMapUsage(value)}
                      className="flex space-x-1 bg-muted p-1 rounded-md"
                    >
                      {(['auto', 'complete', 'none'] as const).map((mode) => (
                        <Label
                          key={mode}
                          htmlFor={`codemap-${mode}`}
                          className={`flex-1 text-center text-xs px-2 py-1 rounded-sm cursor-pointer ${
                            codeMapUsage === mode ? 'bg-background shadow-sm' : 'hover:bg-muted-foreground/20'
                          }`}
                        >
                          <RadioGroupItem value={mode} id={`codemap-${mode}`} className="sr-only" />
                          {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </Label>
                      ))}
                    </RadioGroup>
                    <p className="text-xs text-muted-foreground px-1">
                      {codeMapUsageDescriptions[codeMapUsage]}
                    </p>
                  </div>
                  
                  <div className="text-center text-xs text-muted-foreground pt-2">
                    Supported files scanned: N/A {/* Placeholder */}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center space-x-2">
              <Label className="font-medium">Format:</Label>
              <RadioGroup 
                  defaultValue="whole" 
                  className="flex items-center space-x-2" 
                  value={outputFormat} 
                  onValueChange={(value: 'whole' | 'diff') => setOutputFormat(value)}
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="whole" id="format-whole" />
                  <Label htmlFor="format-whole">Whole</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="diff" id="format-diff" />
                  <Label htmlFor="format-diff">Diff</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="flex items-center">
            <StoredPrompts onSelectPrompt={handleSelectStoredPrompt} />
          </div>
        </div>

        {selectedPromptTags.length > 0 && (
          <div className="p-2 flex flex-wrap gap-2 border-b border-border">
            {selectedPromptTags.map(tag => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                <button onClick={() => handleRemoveTag(tag)} className="rounded-full hover:bg-muted p-0.5">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        <div className="flex-1 p-4 min-h-0">
          <Textarea
            placeholder="Enter your instructions or question here..."
            className="h-full min-h-[100px] w-full resize-none bg-muted/20 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptBuilder;
