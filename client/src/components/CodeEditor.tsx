import React, { useEffect, useRef, useState } from 'react';
import { useFileContext } from '../contexts/FileContext';

// Monaco Editor will be loaded dynamically
const CodeEditor: React.FC = () => {
  const { activeFile, updateFileContent } = useFileContext();
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  // Handle snippet insertion
  const handleSnippetInsertion = (event: CustomEvent) => {
    const { code } = event.detail;
    if (editorRef.current) {
      const selection = editorRef.current.getSelection();
      const range = new (window as any).monaco.Range(
        selection.startLineNumber,
        selection.startColumn,
        selection.endLineNumber,
        selection.endColumn
      );
      
      editorRef.current.executeEdits('insert-snippet', [
        { range, text: code }
      ]);
      
      // Focus the editor after insertion
      editorRef.current.focus();
    }
  };

  useEffect(() => {
    // Load Monaco Editor
    const loadMonaco = async () => {
      if (!(window as any).monaco) {
        // Load Monaco Editor from CDN
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/loader.min.js';
        document.head.appendChild(script);

        script.onload = () => {
          const require = (window as any).require;
          require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' } });
          
          require(['vs/editor/editor.main'], () => {
            if (containerRef.current) {
              const monaco = (window as any).monaco;
              
              // Create editor
              editorRef.current = monaco.editor.create(containerRef.current, {
                value: activeFile?.content || '',
                language: getMonacoLanguage(activeFile?.language || 'python'),
                theme: 'vs-dark',
                fontSize: 14,
                fontFamily: 'Fira Code, Monaco, Consolas, monospace',
                lineNumbers: 'on',
                minimap: { enabled: false },
                automaticLayout: true,
                wordWrap: 'on',
                bracketPairColorization: { enabled: true },
                tabSize: 4,
                insertSpaces: true,
                detectIndentation: false,
                renderWhitespace: 'boundary',
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: true,
                contextmenu: true,
                quickSuggestions: true,
                suggestOnTriggerCharacters: true,
                acceptSuggestionOnEnter: 'on',
                acceptSuggestionOnCommitCharacter: true,
                snippetSuggestions: 'inline',
                wordBasedSuggestions: true,
                formatOnType: true,
                formatOnPaste: true,
                autoIndent: 'full'
              });

              // Listen for content changes
              editorRef.current.onDidChangeModelContent(() => {
                if (activeFile) {
                  const content = editorRef.current.getValue();
                  updateFileContent(activeFile.id, content);
                }
              });

              setIsEditorReady(true);
            }
          });
        };
      }
    };

    loadMonaco();

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
      }
    };
  }, []);

  // Set up snippet insertion event listener
  useEffect(() => {
    window.addEventListener('insertSnippet', handleSnippetInsertion as EventListener);
    
    return () => {
      window.removeEventListener('insertSnippet', handleSnippetInsertion as EventListener);
    };
  }, [handleSnippetInsertion]);

  useEffect(() => {
    if (editorRef.current && isEditorReady && activeFile) {
      const currentValue = editorRef.current.getValue();
      if (currentValue !== activeFile.content) {
        editorRef.current.setValue(activeFile.content);
      }
      
      // Update language
      const monaco = (window as any).monaco;
      const model = editorRef.current.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, getMonacoLanguage(activeFile.language));
      }
    }
  }, [activeFile, isEditorReady]);

  const getMonacoLanguage = (language: string): string => {
    switch (language) {
      case 'python':
        return 'python';
      case 'javascript':
        return 'javascript';
      case 'cpp':
        return 'cpp';
      case 'java':
        return 'java';
      default:
        return 'python';
    }
  };

  if (!activeFile) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-900 text-gray-400">
        <div className="text-center">
          <p className="text-lg">No file selected</p>
          <p className="text-sm mt-2">Create a new file to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative">
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{ backgroundColor: '#1e1e1e' }}
      />
      {!isEditorReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-gray-400">
          <div className="text-center">
            <div className="loading-spinner mb-4" />
            <p>Loading Monaco Editor...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
