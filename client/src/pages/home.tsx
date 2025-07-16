import React, { useEffect } from 'react';
import { useFileContext } from '../contexts/FileContext';
import TopNavigation from '../components/TopNavigation';
import CodeSidebar from '../components/CodeSidebar';
import CodeEditor from '../components/CodeEditor';
import OutputConsole from '../components/OutputConsole';
import UnsavedChangesModal from '../components/UnsavedChangesModal';
import { useToast } from '../hooks/use-toast';

const Home: React.FC = () => {
  const { hasUnsavedChanges } = useFileContext();
  const { toast } = useToast();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges()) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        // Save will be handled by TopNavigation component
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        // Run will be handled by TopNavigation component
      }
    };

    const handleCodeConverted = (event: CustomEvent) => {
      const { from, to, fileName } = event.detail;
      toast({
        title: 'Code Converted',
        description: `Converted code from ${from} to ${to} in ${fileName}`,
        duration: 3000,
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('codeConverted', handleCodeConverted);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('codeConverted', handleCodeConverted);
    };
  }, [hasUnsavedChanges]);

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <TopNavigation />
      
      <div className="flex-1 flex overflow-hidden">
        <CodeSidebar />
        
        <div className="flex-1 flex flex-col">
          <CodeEditor />
          <OutputConsole />
        </div>
      </div>
      
      <UnsavedChangesModal />
    </div>
  );
};

export default Home;
