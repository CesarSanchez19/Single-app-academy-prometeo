import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import {
  modalOverlayClass,
  modalCardClass,
  modalTitleClass,
  modalDescriptionClass,
  modalActionsClass,
  modalCancelButtonClass,
  modalConfirmButtonClass,
} from '@/styles/prometeoStyleClasses.js';

export const ConfirmModal = ({
  isOpen,
  title,
  description,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  isLoading = false,
  error = null,
  onCancel,
  onConfirm,
}) => {
  const cancelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onCancel();
    };

    document.addEventListener('keydown', handleKeyDown);
    cancelRef.current?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className={modalOverlayClass}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      onClick={onCancel}
    >
      <div className={modalCardClass} onClick={(e) => e.stopPropagation()}>
        <h2 id="confirm-modal-title" className={modalTitleClass}>
          {title}
        </h2>
        {description && <p className={modalDescriptionClass}>{description}</p>}
        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-md">
            {error}
          </div>
        )}
        <div className={modalActionsClass}>
          <button
            ref={cancelRef}
            type="button"
            className={`${modalCancelButtonClass} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </button>
          <button 
            type="button" 
            className={`${modalConfirmButtonClass} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`} 
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Processing...
              </span>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
