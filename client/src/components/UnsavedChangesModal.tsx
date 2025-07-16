import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useFileContext } from '../contexts/FileContext';

interface UnsavedChangesModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSave?: () => void;
  onDontSave?: () => void;
  message?: string;
}

const UnsavedChangesModal: React.FC<UnsavedChangesModalProps> = ({
  isOpen: externalIsOpen,
  onClose,
  onSave,
  onDontSave,
  message = "You have unsaved changes. Would you like to save before continuing?"
}) => {
  const { hasUnsavedChanges, saveProject } = useFileContext();
  const [isOpen, setIsOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setIsOpen(externalIsOpen);
    }
  }, [externalIsOpen]);

  const handleSave = () => {
    if (onSave) {
      onSave();
    } else {
      saveProject();
    }
    
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
    
    setIsOpen(false);
    onClose?.();
  };

  const handleDontSave = () => {
    if (onDontSave) {
      onDontSave();
    }
    
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
    
    setIsOpen(false);
    onClose?.();
  };

  const handleCancel = () => {
    setPendingAction(null);
    setIsOpen(false);
    onClose?.();
  };

  // Function to show modal when there are unsaved changes
  const showUnsavedChangesModal = (action: () => void) => {
    if (hasUnsavedChanges()) {
      setPendingAction(() => action);
      setIsOpen(true);
      return false; // Action was not executed
    } else {
      action();
      return true; // Action was executed
    }
  };

  // Expose the function globally for use by other components
  useEffect(() => {
    (window as any).showUnsavedChangesModal = showUnsavedChangesModal;
    
    return () => {
      delete (window as any).showUnsavedChangesModal;
    };
  }, [hasUnsavedChanges]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <span>Unsaved Changes</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-gray-600">{message}</p>
          
          <div className="flex space-x-3">
            <Button
              onClick={handleSave}
              className="flex-1"
            >
              Save
            </Button>
            <Button
              onClick={handleDontSave}
              variant="outline"
              className="flex-1"
            >
              Don't Save
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnsavedChangesModal;
