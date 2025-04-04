
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface StoredPromptsProps {
  onSelectPrompt: (promptText: string) => void;
}

interface SavedPrompt {
  id: string;
  title: string;
  content: string;
}

const SAMPLE_PROMPTS: SavedPrompt[] = [
  { id: 'architect', title: '[Architect]', content: 'Act as a software architect and analyze this codebase...' },
  { id: 'engineer', title: '[Engineer]', content: 'Act as a software engineer and implement the following features...' },
];

const StoredPrompts: React.FC<StoredPromptsProps> = ({ onSelectPrompt }) => {
  const [showStoreDialog, setShowStoreDialog] = useState(false);
  const [newPromptTitle, setNewPromptTitle] = useState('');
  const [newPromptContent, setNewPromptContent] = useState('');

  const handleSavePrompt = () => {
    // In a real app, this would save the prompt to storage
    setShowStoreDialog(false);
    setNewPromptTitle('');
    setNewPromptContent('');
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">Prompts</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          {SAMPLE_PROMPTS.map(prompt => (
            <DropdownMenuItem 
              key={prompt.id}
              onClick={() => onSelectPrompt(prompt.content)}
            >
              {prompt.title}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem
            onClick={() => setShowStoreDialog(true)}
            className="border-t mt-1 pt-1"
          >
            Save New Prompt...
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showStoreDialog} onOpenChange={setShowStoreDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Stored Prompt</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input 
              placeholder="Prompt Title" 
              value={newPromptTitle} 
              onChange={(e) => setNewPromptTitle(e.target.value)}
              className="w-full"
            />
            <Textarea 
              placeholder="Enter prompt to store here..." 
              value={newPromptContent}
              onChange={(e) => setNewPromptContent(e.target.value)}
              className="min-h-[200px]"
            />
          </div>
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowStoreDialog(false)}>Cancel</Button>
            <Button onClick={handleSavePrompt}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StoredPrompts;
