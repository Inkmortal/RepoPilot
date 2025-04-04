import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ApplyPage: React.FC = () => {
  const handleApplyChanges = () => {
    // Placeholder for actual apply logic (IPC call to main process)
    const textAreaElement = document.getElementById('ai-response-textarea') as HTMLTextAreaElement | null;
    console.log("Apply changes clicked. AI Response:", textAreaElement?.value);
    // TODO: Implement IPC call to send the response content to the main process
    // TODO: Handle response from main process (success/failure)
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <div className="grid w-full gap-1.5">
        <Label htmlFor="ai-response-textarea">Paste AI Response with XML formatted changes</Label>
        <Textarea
          placeholder="Paste the XML formatted response from the AI here..."
          id="ai-response-textarea"
          className="flex-grow min-h-[300px] resize-none" // Adjust min-height as needed
        />
      </div>
      <Button onClick={handleApplyChanges}>Apply Changes</Button>
    </div>
  );
};

export default ApplyPage; 