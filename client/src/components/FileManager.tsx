import React, { useState } from 'react';
import { Plus, X, Edit2, Trash2, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFileContext } from '../contexts/FileContext';

const FileManager: React.FC = () => {
  const {
    currentProject,
    activeFile,
    createFile,
    deleteFile,
    renameFile,
    setActiveFile
  } = useFileContext();

  const [isCreating, setIsCreating] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [editFileName, setEditFileName] = useState('');

  const handleCreateFile = () => {
    if (newFileName.trim() && currentProject) {
      createFile(newFileName.trim());
      setNewFileName('');
      setIsCreating(false);
    }
  };

  const handleDeleteFile = (fileId: string) => {
    if (currentProject && currentProject.files.length > 1) {
      if (confirm('Are you sure you want to delete this file?')) {
        deleteFile(fileId);
      }
    } else {
      alert('Cannot delete the last file in the project');
    }
  };

  const handleRenameFile = (fileId: string) => {
    if (editFileName.trim()) {
      renameFile(fileId, editFileName.trim());
      setEditingFileId(null);
      setEditFileName('');
    }
  };

  const startEditing = (file: any) => {
    setEditingFileId(file.id);
    setEditFileName(file.name);
  };

  const cancelEditing = () => {
    setEditingFileId(null);
    setEditFileName('');
  };

  const getFileIcon = (language: string) => {
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

  if (!currentProject) {
    return null;
  }

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700">Files</h3>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsCreating(true)}
          className="h-7 w-7 p-0"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-1">
        {currentProject.files.map((file) => (
          <div
            key={file.id}
            className={`flex items-center space-x-2 p-2 rounded-md text-sm ${
              activeFile?.id === file.id
                ? 'bg-blue-100 text-blue-800'
                : 'hover:bg-gray-100'
            }`}
          >
            {editingFileId === file.id ? (
              <div className="flex items-center space-x-2 flex-1">
                <Input
                  value={editFileName}
                  onChange={(e) => setEditFileName(e.target.value)}
                  className="flex-1 h-6 text-xs"
                  autoFocus
                />
                <Button
                  size="sm"
                  onClick={() => handleRenameFile(file.id)}
                  className="h-6 px-2 text-xs"
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={cancelEditing}
                  className="h-6 px-2 text-xs"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setActiveFile(file.id)}
                  className="flex items-center space-x-2 flex-1 text-left"
                >
                  <span>{getFileIcon(file.language)}</span>
                  <span className="truncate">{file.name}</span>
                  {file.isUnsaved && (
                    <span className="text-orange-500 text-xs">●</span>
                  )}
                </button>
                
                <div className="flex items-center space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => startEditing(file)}
                    className="h-6 w-6 p-0"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteFile(file.id)}
                    className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}

        {isCreating && (
          <div className="flex items-center space-x-2 p-2">
            <Input
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="Enter file name"
              className="flex-1 h-6 text-xs"
              autoFocus
            />
            <Button
              size="sm"
              onClick={handleCreateFile}
              className="h-6 px-2 text-xs"
            >
              Create
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setIsCreating(false);
                setNewFileName('');
              }}
              className="h-6 px-2 text-xs"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileManager;
