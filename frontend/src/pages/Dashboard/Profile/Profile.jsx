import { useState } from 'react';
import { useAuth } from '@hooks/useAuth.js';
import { DashboardPageHeader } from '@components/dashboard/DashboardPageHeader.jsx';
import { StatusBadge } from '@components/dashboard/StatusBadge.jsx';
import { ProfileSection } from '@components/dashboard/profile/ProfileSection.jsx';
import { ChangeEmailModal } from '@components/dashboard/profile/ChangeEmailModal.jsx';
import { ChangePasswordModal } from '@components/dashboard/profile/ChangePasswordModal.jsx';
import {
  profileStackClass,
  profileCardClass,
  profileAvatarClass,
  profileHeaderClass,
  profileMetaGridClass,
  profileMetaLabelClass,
  profileSectionActionsClass,
  formClass,
  fieldClass,
  labelClass,
  inputClass,
  primaryButtonInlineClass,
  secondaryButtonClass,
} from '@/styles/prometeoStyleClasses.js';

const MOCK_PROFILE = {
  firstName: 'Sofía',
  lastName: 'Martín',
  email: 'sofia.martin@prometeo.dev',
  initials: 'SM',
  createdAt: 'March 14, 2024',
};

const getInitials = (user, fallback) => {
  if (user?.name && user?.lastname) {
    return `${user.name[0]}${user.lastname[0]}`.toUpperCase();
  }
  if (user?.name) {
    return user.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }
  if (user?.email) {
    return user.email.slice(0, 2).toUpperCase();
  }
  return fallback;
};

const getDisplayName = (user, firstName, lastName) => {
  if (user?.name && user?.lastname) {
    return `${user.name} ${user.lastname}`;
  }
  if (user?.name) return user.name;
  return `${firstName} ${lastName}`;
};

export const Profile = () => {
  const { user, role } = useAuth();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const firstName = user?.name || MOCK_PROFILE.firstName;
  const lastName = user?.lastname || MOCK_PROFILE.lastName;
  const email = user?.email || MOCK_PROFILE.email;
  const displayName = getDisplayName(user, firstName, lastName);
  const initials = getInitials(user, MOCK_PROFILE.initials);
  const displayRole = (role || 'user').toUpperCase();

  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <DashboardPageHeader eyebrow="Account" title="Your profile" />

      <div className={profileStackClass}>
        <div className={profileCardClass}>
          <div className={profileHeaderClass}>
            <div className={profileAvatarClass} aria-hidden>
              {initials}
            </div>
            <div>
              <p className="text-[17px] font-semibold text-[#0e1520]">{displayName}</p>
              <p className="text-[13px] text-[#5a6a7e]">{email}</p>
            </div>
          </div>

          <div className={profileMetaGridClass}>
            <div>
              <p className={profileMetaLabelClass}>Role</p>
              <StatusBadge variant="accent">{displayRole}</StatusBadge>
            </div>
            <div>
              <p className={profileMetaLabelClass}>Account created</p>
              <p className="text-sm font-semibold text-[#0e1520]">{MOCK_PROFILE.createdAt}</p>
            </div>
          </div>
        </div>

        <ProfileSection
          title="Personal information"
          description="Update your name as it appears across the platform."
        >
          <form className={formClass} onSubmit={handlePersonalInfoSubmit}>
            <div className="grid grid-cols-2 gap-4 max-[480px]:grid-cols-1">
              <div className={fieldClass}>
                <label htmlFor="profile-first-name" className={labelClass}>
                  First name
                </label>
                <input
                  id="profile-first-name"
                  type="text"
                  className={inputClass}
                  defaultValue={firstName}
                  autoComplete="given-name"
                />
              </div>
              <div className={fieldClass}>
                <label htmlFor="profile-last-name" className={labelClass}>
                  Last name
                </label>
                <input
                  id="profile-last-name"
                  type="text"
                  className={inputClass}
                  defaultValue={lastName}
                  autoComplete="family-name"
                />
              </div>
            </div>
            <div className={profileSectionActionsClass}>
              <button type="submit" className={primaryButtonInlineClass}>
                Save changes
              </button>
            </div>
          </form>
        </ProfileSection>

        <ProfileSection
          title="Email address"
          description="Used for login and account notifications."
        >
          <p className="text-sm font-semibold text-[#0e1520]">{email}</p>
          <div className={`${profileSectionActionsClass} justify-start`}>
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => setIsEmailModalOpen(true)}
            >
              Change email
            </button>
          </div>
        </ProfileSection>

        <ProfileSection
          title="Password"
          description="Set a strong password to keep your account secure."
        >
          <p className="text-sm font-semibold tracking-widest text-[#0e1520]">••••••••</p>
          <p className="mt-1 text-[13px] text-[#8d9aad]">Last changed — never</p>
          <div className={`${profileSectionActionsClass} justify-start`}>
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => setIsPasswordModalOpen(true)}
            >
              Change password
            </button>
          </div>
        </ProfileSection>
      </div>

      <ChangeEmailModal
        isOpen={isEmailModalOpen}
        currentEmail={email}
        onCancel={() => setIsEmailModalOpen(false)}
      />

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onCancel={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
};
