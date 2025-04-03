
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CodeViewer: React.FC = () => {
  const { toast } = useToast();
  
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
  
  // Mock code content
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

  return (
    <Card className="h-full">
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">App.tsx</CardTitle>
          <div className="flex items-center mt-1">
            <Badge variant="outline" className="text-xs mr-2">TypeScript</Badge>
            <Badge variant="outline" className="text-xs mr-2">React</Badge>
            <span className="text-xs text-muted-foreground">4.2KB</span>
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
          <pre className="code-editor text-sm p-4 bg-muted/50 overflow-auto max-h-[calc(100vh-22rem)]">
            <code>{codeContent}</code>
          </pre>
          <div className="absolute bottom-2 right-2">
            <Badge variant="secondary" className="text-xs">
              ~240 tokens
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeViewer;
