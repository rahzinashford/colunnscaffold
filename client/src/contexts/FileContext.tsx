import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loadProjects, saveProjects, createNewProject, deleteProject } from '../lib/storage';
import { convertCode, canConvert } from '../lib/codeConverter';
import { getTemplateForLanguage, getDefaultFileName, getLanguageFromExtension } from '../lib/templates';

export interface CodeFile {
  id: string;
  name: string;
  content: string;
  language: string;
  isUnsaved: boolean;
}

export interface Project {
  id: string;
  name: string;
  files: CodeFile[];
  activeFileId: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

interface FileContextValue {
  currentProject: Project | null;
  projects: Project[];
  activeFile: CodeFile | null;
  isUnsaved: boolean;
  
  // Project management
  createProject: (name: string, language: string) => void;
  loadProject: (projectId: string) => void;
  saveProject: () => void;
  deleteProject: (projectId: string) => void;
  renameProject: (projectId: string, newName: string) => void;
  
  // File management
  createFile: (name: string, language?: string) => void;
  deleteFile: (fileId: string) => void;
  renameFile: (fileId: string, newName: string) => void;
  setActiveFile: (fileId: string) => void;
  updateFileContent: (fileId: string, content: string) => void;
  
  // Language management
  changeLanguage: (language: string) => void;
  
  // Unsaved changes
  markFileAsUnsaved: (fileId: string) => void;
  markFileAsSaved: (fileId: string) => void;
  hasUnsavedChanges: () => boolean;
}

const FileContext = createContext<FileContextValue | undefined>(undefined);

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFileContext must be used within a FileProvider');
  }
  return context;
};

export const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isUnsaved, setIsUnsaved] = useState(false);

  useEffect(() => {
    const loadedProjects = loadProjects();
    setProjects(loadedProjects);
    
    // Load the most recent project or create a new one
    if (loadedProjects.length > 0) {
      const lastProject = loadedProjects[0];
      setCurrentProject(lastProject);
    } else {
      const newProject = createNewProject('my-first-project', 'python');
      setCurrentProject(newProject);
      setProjects([newProject]);
      saveProjects([newProject]);
    }
  }, []);

  const activeFile = currentProject 
    ? currentProject.files.find(f => f.id === currentProject.activeFileId) || currentProject.files[0]
    : null;

  const createProject = (name: string, language: string) => {
    const newProject = createNewProject(name, language);
    const updatedProjects = [newProject, ...projects];
    setProjects(updatedProjects);
    setCurrentProject(newProject);
    saveProjects(updatedProjects);
  };

  const loadProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setCurrentProject(project);
    }
  };

  const saveProject = () => {
    if (!currentProject) return;
    
    const updatedProject = {
      ...currentProject,
      updatedAt: new Date().toISOString(),
      files: currentProject.files.map(f => ({ ...f, isUnsaved: false }))
    };
    
    const updatedProjects = projects.map(p => 
      p.id === currentProject.id ? updatedProject : p
    );
    
    setProjects(updatedProjects);
    setCurrentProject(updatedProject);
    saveProjects(updatedProjects);
    setIsUnsaved(false);
  };

  const deleteProjectById = (projectId: string) => {
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    
    if (currentProject?.id === projectId) {
      if (updatedProjects.length > 0) {
        setCurrentProject(updatedProjects[0]);
      } else {
        const newProject = createNewProject('my-project', 'python');
        setCurrentProject(newProject);
        setProjects([newProject]);
        saveProjects([newProject]);
        return;
      }
    }
    
    saveProjects(updatedProjects);
  };

  const renameProject = (projectId: string, newName: string) => {
    const updatedProjects = projects.map(p => 
      p.id === projectId ? { ...p, name: newName, updatedAt: new Date().toISOString() } : p
    );
    setProjects(updatedProjects);
    
    if (currentProject?.id === projectId) {
      setCurrentProject({ ...currentProject, name: newName });
    }
    
    saveProjects(updatedProjects);
  };

  const createFile = (name: string, language?: string) => {
    if (!currentProject) return;
    
    // If no language specified, use project language or detect from filename
    const fileLanguage = language || getLanguageFromExtension(name) || currentProject.language;
    
    // Get template for the language
    const template = getTemplateForLanguage(fileLanguage);
    
    const newFile: CodeFile = {
      id: Date.now().toString(),
      name,
      content: template.template,
      language: fileLanguage,
      isUnsaved: false
    };
    
    const updatedProject = {
      ...currentProject,
      files: [...currentProject.files, newFile],
      activeFileId: newFile.id,
      updatedAt: new Date().toISOString()
    };
    
    setCurrentProject(updatedProject);
    
    const updatedProjects = projects.map(p => 
      p.id === currentProject.id ? updatedProject : p
    );
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  };

  const deleteFile = (fileId: string) => {
    if (!currentProject) return;
    
    const updatedFiles = currentProject.files.filter(f => f.id !== fileId);
    if (updatedFiles.length === 0) return; // Don't delete the last file
    
    const newActiveFileId = currentProject.activeFileId === fileId 
      ? updatedFiles[0].id 
      : currentProject.activeFileId;
    
    const updatedProject = {
      ...currentProject,
      files: updatedFiles,
      activeFileId: newActiveFileId,
      updatedAt: new Date().toISOString()
    };
    
    setCurrentProject(updatedProject);
    
    const updatedProjects = projects.map(p => 
      p.id === currentProject.id ? updatedProject : p
    );
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  };

  const renameFile = (fileId: string, newName: string) => {
    if (!currentProject) return;
    
    const updatedFiles = currentProject.files.map(f => 
      f.id === fileId ? { ...f, name: newName } : f
    );
    
    const updatedProject = {
      ...currentProject,
      files: updatedFiles,
      updatedAt: new Date().toISOString()
    };
    
    setCurrentProject(updatedProject);
    
    const updatedProjects = projects.map(p => 
      p.id === currentProject.id ? updatedProject : p
    );
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  };

  const setActiveFile = (fileId: string) => {
    if (!currentProject) return;
    
    const updatedProject = {
      ...currentProject,
      activeFileId: fileId
    };
    
    setCurrentProject(updatedProject);
  };

  const updateFileContent = (fileId: string, content: string) => {
    if (!currentProject) return;
    
    const updatedFiles = currentProject.files.map(f => 
      f.id === fileId ? { ...f, content, isUnsaved: true } : f
    );
    
    const updatedProject = {
      ...currentProject,
      files: updatedFiles,
      updatedAt: new Date().toISOString()
    };
    
    setCurrentProject(updatedProject);
    setIsUnsaved(true);
  };

  const changeLanguage = (language: string) => {
    if (!currentProject) return;
    
    const oldLanguage = currentProject.language;
    
    // Update all files to use the new language and convert code if possible
    const updatedFiles = currentProject.files.map(f => {
      let newContent = f.content;
      
      // Try to convert code if conversion is available
      if (canConvert(oldLanguage, language)) {
        newContent = convertCode(f.content, oldLanguage, language);
        
        // Dispatch event to notify about conversion
        window.dispatchEvent(new CustomEvent('codeConverted', {
          detail: {
            from: oldLanguage,
            to: language,
            fileName: f.name
          }
        }));
      }
      
      return {
        ...f,
        language,
        content: newContent,
        isUnsaved: true
      };
    });
    
    const updatedProject = {
      ...currentProject,
      language,
      files: updatedFiles,
      updatedAt: new Date().toISOString()
    };
    
    setCurrentProject(updatedProject);
    
    const updatedProjects = projects.map(p => 
      p.id === currentProject.id ? updatedProject : p
    );
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  };

  const markFileAsUnsaved = (fileId: string) => {
    if (!currentProject) return;
    
    const updatedFiles = currentProject.files.map(f => 
      f.id === fileId ? { ...f, isUnsaved: true } : f
    );
    
    const updatedProject = {
      ...currentProject,
      files: updatedFiles
    };
    
    setCurrentProject(updatedProject);
    setIsUnsaved(true);
  };

  const markFileAsSaved = (fileId: string) => {
    if (!currentProject) return;
    
    const updatedFiles = currentProject.files.map(f => 
      f.id === fileId ? { ...f, isUnsaved: false } : f
    );
    
    const updatedProject = {
      ...currentProject,
      files: updatedFiles
    };
    
    setCurrentProject(updatedProject);
    
    const hasUnsaved = updatedFiles.some(f => f.isUnsaved);
    setIsUnsaved(hasUnsaved);
  };

  const hasUnsavedChanges = () => {
    return currentProject?.files.some(f => f.isUnsaved) || false;
  };

  return (
    <FileContext.Provider value={{
      currentProject,
      projects,
      activeFile,
      isUnsaved,
      createProject,
      loadProject,
      saveProject,
      deleteProject: deleteProjectById,
      renameProject,
      createFile,
      deleteFile,
      renameFile,
      setActiveFile,
      updateFileContent,
      changeLanguage,
      markFileAsUnsaved,
      markFileAsSaved,
      hasUnsavedChanges
    }}>
      {children}
    </FileContext.Provider>
  );
};
