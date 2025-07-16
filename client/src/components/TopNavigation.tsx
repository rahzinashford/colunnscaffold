import React, { useState } from 'react';
import { Code, Play, Save, Settings, FolderOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFileContext } from '../contexts/FileContext';
import { executeCode } from '../lib/codeExecution';
import ProjectModal from './ProjectModal';

const TopNavigation: React.FC = () => {
  const {
    currentProject,
    activeFile,
    isUnsaved,
    saveProject,
    changeLanguage,
    createFile,
    updateFileContent,
    setActiveFile
  } = useFileContext();

  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<any>(null);

  const handleSave = () => {
    saveProject();
  };

  const handleRun = async () => {
    if (!activeFile) return;
    
    setIsRunning(true);
    try {
      const result = await executeCode(activeFile.content, activeFile.language);
      setExecutionResult(result);
      
      // Update console output (this will be handled by OutputConsole component)
      window.dispatchEvent(new CustomEvent('codeExecuted', { detail: result }));
    } catch (error) {
      console.error('Execution error:', error);
      setExecutionResult({
        success: false,
        output: '',
        error: 'Failed to execute code',
        executionTime: 0
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleLanguageChange = (language: string) => {
    const showWarning = (window as any).showUnsavedChangesModal;
    if (showWarning) {
      showWarning(() => {
        changeLanguage(language);
      });
    } else {
      changeLanguage(language);
    }
  };

  const handleCreateFile = () => {
    if (!currentProject) return;
    
    const fileName = prompt('Enter file name:');
    if (fileName) {
      createFile(fileName, currentProject.language);
    }
  };

  const getLanguageIcon = (language: string) => {
    switch (language) {
      case 'python':
        return '🐍';
      case 'javascript':
        return '🟨';
      case 'cpp':
        return '🔧';
      case 'java':
        return '☕';
      default:
        return '📄';
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 h-14 flex items-center justify-between px-4 shadow-sm">
      {/* Left: Logo and Project Info */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Code className="text-blue-600 h-6 w-6" />
          <span className="text-xl font-bold text-gray-800">CodeScaffold</span>
        </div>
        
        <div className="h-6 w-px bg-gray-300" />
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>{currentProject?.name || 'No Project'}</span>
          <span>/</span>
          <span className="flex items-center space-x-1">
            <span>{getLanguageIcon(activeFile?.language || 'python')}</span>
            <span>{activeFile?.name || 'No File'}</span>
          </span>
          {(isUnsaved || activeFile?.isUnsaved) && (
            <span className="unsaved-indicator">● unsaved</span>
          )}
        </div>
      </div>

      {/* Center: File Tabs */}
      <div className="flex items-center space-x-1">
        {currentProject?.files.map((file) => (
          <div
            key={file.id}
            className={`file-tab ${file.id === activeFile?.id ? 'active' : 'inactive'}`}
            onClick={() => setActiveFile(file.id)}
          >
            <span>{getLanguageIcon(file.language)}</span>
            <span>{file.name}</span>
            {file.isUnsaved && <span className="text-orange-500 text-xs">●</span>}
          </div>
        ))}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCreateFile}
          className="text-gray-500 hover:text-gray-700"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center space-x-3">
        <ProjectModal />
        
        <Select value={currentProject?.language || 'python'} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
            <SelectItem value="java">Java</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          className="flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>Save</span>
        </Button>

        <Button
          size="sm"
          onClick={handleRun}
          disabled={isRunning}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
        >
          <Play className="h-4 w-4" />
          <span>{isRunning ? 'Running...' : 'Run'}</span>
        </Button>
      </div>
    </nav>
  );
};

export default TopNavigation;
