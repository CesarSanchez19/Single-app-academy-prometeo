import { useMemo, useState } from 'react';
import { Check, X } from 'lucide-react';
import { FormModal } from '@components/dashboard/FormModal.jsx';
import {
  formClass,
  fieldClass,
  labelClass,
  inputClass,
  passwordChecklistClass,
  passwordRuleClass,
  passwordRulePassClass,
  passwordRuleFailClass,
} from '@/styles/prometeoStyleClasses.js';

const PASSWORD_RULES = [
  { key: 'length', label: 'At least 8 characters', test: (v) => v.length >= 8 },
  { key: 'uppercase', label: 'At least one uppercase letter', test: (v) => /[A-Z]/.test(v) },
  { key: 'number', label: 'At least one number', test: (v) => /\d/.test(v) },
];

export const ChangePasswordModal = ({ isOpen, onCancel }) => {
  const [newPassword, setNewPassword] = useState('');

  const passwordChecks = useMemo(
    () => PASSWORD_RULES.map((rule) => ({ ...rule, passed: rule.test(newPassword) })),
    [newPassword]
  );

  const handleCancel = () => {
    setNewPassword('');
    onCancel();
  };

  return (
    <FormModal
      isOpen={isOpen}
      title="Change password"
      description="Choose a strong password you don't use elsewhere."
      cancelLabel="Cancel"
      submitLabel="Save changes"
      onCancel={handleCancel}
      onSubmit={() => {}}
    >
      <div className={formClass}>
        <div className={fieldClass}>
          <label htmlFor="profile-current-password" className={labelClass}>
            Current password
          </label>
          <input
            id="profile-current-password"
            type="password"
            className={inputClass}
            placeholder="Enter your current password"
            autoComplete="current-password"
          />
        </div>
        <div className={fieldClass}>
          <label htmlFor="profile-new-password" className={labelClass}>
            New password
          </label>
          <input
            id="profile-new-password"
            type="password"
            className={inputClass}
            placeholder="Enter a new password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className={fieldClass}>
          <label htmlFor="profile-confirm-password" className={labelClass}>
            Confirm new password
          </label>
          <input
            id="profile-confirm-password"
            type="password"
            className={inputClass}
            placeholder="Repeat your new password"
            autoComplete="new-password"
          />
        </div>
        <div className={passwordChecklistClass} aria-label="Password requirements">
          {passwordChecks.map((rule) => (
            <div
              key={rule.key}
              className={`${passwordRuleClass} ${rule.passed ? passwordRulePassClass : passwordRuleFailClass}`}
            >
              {rule.passed ? (
                <Check size={14} strokeWidth={2.5} aria-hidden />
              ) : (
                <X size={14} strokeWidth={2.5} aria-hidden />
              )}
              <span>{rule.label}</span>
            </div>
          ))}
        </div>
      </div>
    </FormModal>
  );
};
