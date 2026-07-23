import { useEffect, useRef } from 'react';
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
        <div className={modalActionsClass}>
          <button
            ref={cancelRef}
            type="button"
            className={modalCancelButtonClass}
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button type="button" className={modalConfirmButtonClass} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
