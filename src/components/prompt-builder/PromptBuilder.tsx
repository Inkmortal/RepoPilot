
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy, Download, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PromptBuilder: React.FC = () => {
  const { toast } = useToast();
  const [formatType, setFormatType] = useState('xml');
  
  const handleGeneratePrompt = () => {
    toast({
      title: "Prompt generated",
      description: "The prompt has been generated with selected files.",
    });
  };
  
  const handleCopyPrompt = () => {
    toast({
      title: "Prompt copied",
      description: "The prompt has been copied to your clipboard.",
    });
  };
  
  const handleDownload = () => {
    toast({
      title: "Feature in development",
      description: "Downloading prompts will be available in the next version.",
    });
  };
  
  // Mock prompt content
  const xmlPrompt = `<codebase>
  <file path="src/App.tsx" language="typescript">
    <content>
import React, { useState } from 'react';
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

export default App;
    </content>
    <metadata>
      <imports>
        <import name="React" path="react" />
        <import name="useState" path="react" />
        <import name="Button" path="./components/Button" />
      </imports>
      <exports>
        <export name="App" type="default" />
      </exports>
    </metadata>
  </file>
</codebase>`;

  const jsonPrompt = `{
  "codebase": {
    "file": {
      "path": "src/App.tsx",
      "language": "typescript",
      "content": "import React, { useState } from 'react';\\nimport { Button } from './components/Button';\\n\\nfunction App() {\\n  const [count, setCount] = useState(0);\\n\\n  return (\\n    <div className=\\"container\\">\\n      <header className=\\"app-header\\">\\n        <h1>RepoPilot Demo App</h1>\\n        <p>\\n          Edit <code>src/App.tsx</code> and save to test hot reloading.\\n        </p>\\n        <div>\\n          <Button onClick={() => setCount(count + 1)}>\\n            Count is {count}\\n          </Button>\\n        </div>\\n      </header>\\n    </div>\\n  );\\n}\\n\\nexport default App;",
      "metadata": {
        "imports": [
          { "name": "React", "path": "react" },
          { "name": "useState", "path": "react" },
          { "name": "Button", "path": "./components/Button" }
        ],
        "exports": [
          { "name": "App", "type": "default" }
        ]
      }
    }
  }
}`;

  return (
    <Card className="h-full">
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Prompt Builder</CardTitle>
          <div className="flex items-center mt-1">
            <Badge variant="outline" className="text-xs mr-2">1 file selected</Badge>
            <Badge variant="secondary" className="text-xs">
              ~325 tokens
            </Badge>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={formatType} onValueChange={setFormatType}>
            <SelectTrigger className="w-[110px] h-8">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="xml">XML Format</SelectItem>
              <SelectItem value="json">JSON Format</SelectItem>
              <SelectItem value="ast">AST Format</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="default" 
            size="sm" 
            className="h-8"
            onClick={handleGeneratePrompt}
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            Generate
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="prompt" className="w-full">
          <div className="px-4 pt-2">
            <TabsList className="grid w-[300px] grid-cols-2">
              <TabsTrigger value="prompt">Prompt</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="prompt" className="relative">
            <pre className="code-editor text-xs p-4 bg-muted/50 overflow-auto max-h-[calc(100vh-26rem)] min-h-[250px]">
              <code>{formatType === 'xml' ? xmlPrompt : jsonPrompt}</code>
            </pre>
            <div className="absolute bottom-2 right-2 flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7"
                onClick={handleCopyPrompt}
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7"
                onClick={handleDownload}
              >
                <Download className="h-3 w-3 mr-1" />
                Save
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="preview">
            <div className="p-4 text-sm text-muted-foreground">
              <p className="mb-2">Preview of how the prompt will appear in your LLM chat:</p>
              <div className="p-3 border rounded-md bg-card">
                <p className="font-medium">User:</p>
                <p className="text-xs mt-1">Here is the code from my React application. I'd like to add a feature that allows the user to reset the counter. Please show me how to implement this:</p>
                <div className="mt-2 p-2 bg-muted/50 rounded-md text-xs">
                  <code>{formatType === 'xml' ? xmlPrompt.substring(0, 200) + '...' : jsonPrompt.substring(0, 200) + '...'}</code>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PromptBuilder;
