
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

const CodeViewer: React.FC = () => {
  const { toast } = useToast();
  const [fileName, setFileName] = useState("App.tsx"); // In a real app, this would be dynamic
  
  const handleCopyCode = () => {
    toast({
      title: "Code copied",
      description: "The code has been copied to your clipboard.",
    });
  };
  
  const handleDownload = () => {
    toast({
      title: "Feature in development",
      description: "Downloading files will be available in the next version.",
    });
  };
  
  // Mock code content - in a real app, this would be loaded dynamically
  const codeContent = `import React, { useState } from 'react';
import { Button } from './components/Button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <header className="app-header">
        <h1>RepoPilot Demo App</h1>
        <p>
          Edit <code>src/App.tsx</code> and save to test hot reloading.
        </p>
        <div>
          <Button onClick={() => setCount(count + 1)}>
            Count is {count}
          </Button>
        </div>
      </header>
    </div>
  );
}

export default App;`;

  // Calculate approximate token count
  const tokenCount = Math.floor(codeContent.split(/\s+/).length * 1.3);
  const fileSize = "4.2KB"; // In a real app, this would be calculated

  return (
    <Card className="h-full">
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">File Preview</CardTitle>
          <div className="flex items-center mt-1">
            <Badge variant="outline" className="text-xs mr-2">{fileName}</Badge>
            <Badge variant="outline" className="text-xs mr-2">TypeScript</Badge>
            <span className="text-xs text-muted-foreground">{fileSize}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8"
            onClick={handleCopyCode}
          >
            <Copy className="h-3.5 w-3.5 mr-1" />
            Copy
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8"
            onClick={handleDownload}
          >
            <Download className="h-3.5 w-3.5 mr-1" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          <ScrollArea className="h-[calc(100vh-22rem)]">
            <pre className="code-editor text-sm p-4 bg-muted/50">
              <code>{codeContent}</code>
            </pre>
          </ScrollArea>
          <div className="absolute bottom-2 right-2">
            <Badge variant="secondary" className="text-xs">
              ~{tokenCount} tokens
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeViewer;
