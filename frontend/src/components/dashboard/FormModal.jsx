import { useEffect, useRef } from 'react';
import {
  modalOverlayClass,
  modalFormCardClass,
  modalTitleClass,
  modalDescriptionClass,
  modalActionsClass,
  modalCancelButtonClass,
  modalPrimaryButtonClass,
} from '@/styles/prometeoStyleClasses.js';

export const FormModal = ({
  isOpen,
  title,
  description,
  cancelLabel = 'Cancel',
  submitLabel = 'Save changes',
  onCancel,
  onSubmit,
  hideActions = false,
  children,
}) => {
  const cancelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onCancel();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  useEffect(() => {
    if (isOpen && !hideActions) {
      cancelRef.current?.focus();
    }
  }, [isOpen, hideActions]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <div
      className={modalOverlayClass}
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-modal-title"
      onClick={onCancel}
    >
      <div className={modalFormCardClass} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          {title && (
            <h2 id="form-modal-title" className={modalTitleClass}>
              {title}
            </h2>
          )}
          {description && <p className={modalDescriptionClass}>{description}</p>}
          {children}
          {!hideActions && (
            <div className={modalActionsClass}>
              <button
                ref={cancelRef}
                type="button"
                className={modalCancelButtonClass}
                onClick={onCancel}
              >
                {cancelLabel}
              </button>
              <button type="submit" className={modalPrimaryButtonClass}>
                {submitLabel}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
