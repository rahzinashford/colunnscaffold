import { Project, CodeFile } from '../contexts/FileContext';
import { getTemplateForLanguage } from './templates';

const STORAGE_KEY = 'codescaffold_projects';

export const loadProjects = (): Project[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load projects:', error);
    return [];
  }
};

export const saveProjects = (projects: Project[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error('Failed to save projects:', error);
  }
};

export const createNewProject = (name: string, language: string): Project => {
  const now = new Date().toISOString();
  const template = getTemplateForLanguage(language);
  
  const mainFile: CodeFile = {
    id: 'main',
    name: template.defaultName,
    content: template.template,
    language,
    isUnsaved: false
  };

  return {
    id: Date.now().toString(),
    name,
    files: [mainFile],
    activeFileId: mainFile.id,
    language,
    createdAt: now,
    updatedAt: now
  };
};

export const deleteProject = (projectId: string): void => {
  const projects = loadProjects();
  const updatedProjects = projects.filter(p => p.id !== projectId);
  saveProjects(updatedProjects);
};



