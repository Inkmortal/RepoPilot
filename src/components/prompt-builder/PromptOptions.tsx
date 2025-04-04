
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface PromptOptionsProps {
  includeCodeMap: boolean;
  setIncludeCodeMap: (value: boolean) => void;
  editPromptType: 'none' | 'diff' | 'full';
  setEditPromptType: (type: 'none' | 'diff' | 'full') => void;
}

const PromptOptions: React.FC<PromptOptionsProps> = ({
  includeCodeMap,
  setIncludeCodeMap,
  editPromptType,
  setEditPromptType
}) => {
  return (
    <div className="flex gap-4 pt-1 pb-3">
      <div className="flex items-center gap-2">
        <Checkbox 
          id="codeMap" 
          checked={includeCodeMap}
          onCheckedChange={(checked) => setIncludeCodeMap(!!checked)} 
        />
        <label htmlFor="codeMap" className="text-sm cursor-pointer">Include Code Map</label>
      </div>
      
      <div className="flex items-center gap-2">
        <Checkbox 
          id="diffEdit" 
          checked={editPromptType === 'diff'}
          onCheckedChange={(checked) => checked ? setEditPromptType('diff') : setEditPromptType('none')} 
        />
        <label htmlFor="diffEdit" className="text-sm cursor-pointer">Diff Edit Prompt</label>
      </div>
      
      <div className="flex items-center gap-2">
        <Checkbox 
          id="fullEdit" 
          checked={editPromptType === 'full'}
          onCheckedChange={(checked) => checked ? setEditPromptType('full') : setEditPromptType('none')} 
        />
        <label htmlFor="fullEdit" className="text-sm cursor-pointer">Full Edit Prompt</label>
      </div>
    </div>
  );
};

export default PromptOptions;
