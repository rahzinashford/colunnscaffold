import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useFileContext } from '../contexts/FileContext';
import { getSnippetsForLanguage, SnippetSection } from '../lib/codeSnippets';
import FileManager from './FileManager';

const CodeSidebar: React.FC = () => {
  const { currentProject, activeFile, updateFileContent } = useFileContext();
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['variables', 'loops', 'conditionals']));

  const snippetSections = getSnippetsForLanguage(currentProject?.language || 'python');

  const toggleSection = (sectionId: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(sectionId)) {
      newOpenSections.delete(sectionId);
    } else {
      newOpenSections.add(sectionId);
    }
    setOpenSections(newOpenSections);
  };

  const insertSnippet = (code: string) => {
    if (!activeFile) return;
    
    // Dispatch event to CodeEditor to insert at cursor position
    window.dispatchEvent(new CustomEvent('insertSnippet', { detail: { code } }));
  };

  const renderSnippetSection = (section: SnippetSection) => {
    const isOpen = openSections.has(section.id);
    
    return (
      <div key={section.id} className="sidebar-section">
        <Collapsible open={isOpen} onOpenChange={() => toggleSection(section.id)}>
          <CollapsibleTrigger asChild>
            <button className="sidebar-section-header">
              <div className="flex items-center space-x-3">
                <i className={`${section.icon} text-blue-600`} />
                <span className="font-medium text-gray-800">{section.title}</span>
              </div>
              {isOpen ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="sidebar-section-content">
              {section.snippets.map((snippet) => (
                <Button
                  key={snippet.id}
                  variant="ghost"
                  className="code-snippet-btn"
                  onClick={() => insertSnippet(snippet.code)}
                  title={snippet.description}
                >
                  <code className="text-xs">{snippet.label}</code>
                </Button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  };

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
      <FileManager />
      
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <i className="fas fa-puzzle-piece mr-2 text-blue-600" />
          Code Components
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Click snippets to insert into your code
        </p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {snippetSections.map(renderSnippetSection)}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CodeSidebar;
