import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormModal } from '@components/dashboard/FormModal.jsx';
import { updateUserEmail } from '@services/user.service.js';
import { useAuth } from '@hooks/useAuth.js';
import {
  formClass,
  fieldClass,
  labelClass,
  inputClass,
  submitButtonClass,
} from '@/styles/prometeoStyleClasses.js';
import { CheckCircle2 } from 'lucide-react';

export const ChangeEmailModal = ({ isOpen, currentEmail, onCancel }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    if (!newEmail || !password) {
      setError("Please fill in all fields.");
      return;
    }
    
    setIsSaving(true);
    try {
      await updateUserEmail({ newEmail, password });
      setSuccess(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update email.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setNewEmail('');
    setPassword('');
    setError(null);
    setSuccess(false);
    onCancel();
  };

  const handleGoToLogin = () => {
    logout();
    navigate('/login');
  };

  if (success) {
    return (
      <FormModal
        isOpen={isOpen}
        title=""
        description=""
        onCancel={() => {}}
        onSubmit={() => {}}
        hideActions
      >
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <CheckCircle2 size={48} className="text-green-500 mb-4" />
          <h3 className="text-xl font-bold text-[#0e1520] mb-2">Email updated successfully</h3>
          <p className="text-[#5a6a7e] mb-6">
            For security reasons, all active sessions have been closed. Please log in again using your new email address.
          </p>
          <button
            type="button"
            onClick={handleGoToLogin}
            className={submitButtonClass}
          >
            Go to login
          </button>
        </div>
      </FormModal>
    );
  }

  return (
    <FormModal
      isOpen={isOpen}
      title="Change email address"
      description="Enter your new email and confirm your identity with your current password."
      cancelLabel="Cancel"
      submitLabel={isSaving ? "Saving..." : "Save changes"}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
    >
      <div className={formClass}>
        <div className={fieldClass}>
          <label htmlFor="profile-current-email" className={labelClass}>
            Current email
          </label>
          <input
            id="profile-current-email"
            type="email"
            className={inputClass}
            value={currentEmail}
            readOnly
            disabled
          />
        </div>
        <div className={fieldClass}>
          <label htmlFor="profile-new-email" className={labelClass}>
            New email address
          </label>
          <input
            id="profile-new-email"
            type="email"
            className={inputClass}
            placeholder="you@example.com"
            autoComplete="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <div className={fieldClass}>
          <label htmlFor="profile-email-password" className={labelClass}>
            Current password
          </label>
          <input
            id="profile-email-password"
            type="password"
            className={inputClass}
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </FormModal>
  );
};
