import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Trash2, Maximize2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ExecutionResult } from '../lib/codeExecution';

interface OutputEntry {
  id: string;
  type: 'command' | 'output' | 'error' | 'success';
  content: string;
  timestamp: Date;
}

const OutputConsole: React.FC = () => {
  const [entries, setEntries] = useState<OutputEntry[]>([
    {
      id: '1',
      type: 'command',
      content: 'Welcome to CodeScaffold Console',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'output',
      content: 'Click "Run" to execute your code',
      timestamp: new Date()
    }
  ]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleCodeExecuted = (event: CustomEvent<ExecutionResult>) => {
      const result = event.detail;
      const timestamp = new Date();
      
      // Add execution start entry
      const commandEntry: OutputEntry = {
        id: Date.now().toString(),
        type: 'command',
        content: `$ Running code...`,
        timestamp
      };
      
      setEntries(prev => [...prev, commandEntry]);
      
      // Add result entry
      if (result.success) {
        const outputEntry: OutputEntry = {
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: result.output,
          timestamp
        };
        
        const successEntry: OutputEntry = {
          id: (Date.now() + 2).toString(),
          type: 'success',
          content: `✓ Execution completed successfully in ${result.executionTime}ms`,
          timestamp
        };
        
        setEntries(prev => [...prev, outputEntry, successEntry]);
      } else {
        const errorEntry: OutputEntry = {
          id: (Date.now() + 1).toString(),
          type: 'error',
          content: result.error || 'Unknown error',
          timestamp
        };
        
        setEntries(prev => [...prev, errorEntry]);
      }
      
      // Add prompt
      const promptEntry: OutputEntry = {
        id: (Date.now() + 3).toString(),
        type: 'command',
        content: '$ ',
        timestamp
      };
      
      setEntries(prev => [...prev, promptEntry]);
    };

    window.addEventListener('codeExecuted', handleCodeExecuted as EventListener);
    
    return () => {
      window.removeEventListener('codeExecuted', handleCodeExecuted as EventListener);
    };
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new entries are added
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [entries]);

  const clearConsole = () => {
    setEntries([
      {
        id: Date.now().toString(),
        type: 'command',
        content: 'Console cleared',
        timestamp: new Date()
      }
    ]);
  };

  const copyOutput = () => {
    const output = entries
      .filter(entry => entry.type === 'output')
      .map(entry => entry.content)
      .join('\n');
    
    navigator.clipboard.writeText(output);
  };

  const getEntryClassName = (type: string) => {
    switch (type) {
      case 'command':
        return 'text-gray-400';
      case 'output':
        return 'text-green-300';
      case 'error':
        return 'text-red-400';
      case 'success':
        return 'text-green-400';
      default:
        return 'text-gray-300';
    }
  };

  const formatContent = (content: string, type: string) => {
    if (type === 'command' && content.startsWith('$ ')) {
      return (
        <span>
          <span className="text-green-400">$</span>
          <span className="text-gray-300">{content.slice(1)}</span>
        </span>
      );
    }
    return content;
  };

  return (
    <div className="h-48 console-output border-t border-gray-700 flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Terminal className="h-4 w-4 text-green-400" />
          <span className="text-gray-300 font-medium">Output</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={copyOutput}
            className="text-gray-400 hover:text-gray-200 h-8 w-8 p-0"
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearConsole}
            className="text-gray-400 hover:text-gray-200 h-8 w-8 p-0"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-3">
        <div className="space-y-1">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`font-mono text-sm ${getEntryClassName(entry.type)}`}
            >
              {formatContent(entry.content, entry.type)}
            </div>
          ))}
          <div className="text-gray-400 font-mono text-sm">
            <span className="text-green-400">$</span>
            <span className="animate-pulse ml-1">_</span>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default OutputConsole;
