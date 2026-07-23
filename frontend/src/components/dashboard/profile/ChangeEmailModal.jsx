import { FormModal } from '@components/dashboard/FormModal.jsx';
import {
  formClass,
  fieldClass,
  labelClass,
  inputClass,
} from '@/styles/prometeoStyleClasses.js';

export const ChangeEmailModal = ({ isOpen, currentEmail, onCancel }) => (
  <FormModal
    isOpen={isOpen}
    title="Change email address"
    description="Enter your new email and confirm your identity with your current password."
    cancelLabel="Cancel"
    submitLabel="Save changes"
    onCancel={onCancel}
    onSubmit={() => {}}
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
        />
      </div>
    </div>
  </FormModal>
);
