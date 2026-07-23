import { useState, useEffect } from 'react';
import { useAuth } from '@hooks/useAuth.js';
import { DashboardPageHeader } from '@components/dashboard/DashboardPageHeader.jsx';
import { StatusBadge } from '@components/dashboard/StatusBadge.jsx';
import { ProfileSection } from '@components/dashboard/profile/ProfileSection.jsx';
import { ChangeEmailModal } from '@components/dashboard/profile/ChangeEmailModal.jsx';
import { getUserProfile, updateUserProfile } from '@services/user.service.js';
import { forgotPassword } from '@services/auth.service.js';
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
  const { user, role, updateUser } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    lastname: user?.lastname || '',
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  const [saveError, setSaveError] = useState(null);
  
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        if (response?.user) {
          const freshUser = response.user;
          updateUser(freshUser);
          setFormData({
            name: freshUser.name || '',
            lastname: freshUser.lastname || '',
          });
        }
      } catch (error) {
        console.error("Failed to fetch fresh profile", error);
      }
    };
    fetchProfile();
  }, [updateUser]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCancelPersonalInfo = () => {
    setFormData({
      name: user?.name || '',
      lastname: user?.lastname || '',
    });
    setSaveMessage(null);
    setSaveError(null);
  };

  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage(null);
    setSaveError(null);
    
    try {
      const res = await updateUserProfile(formData);
      if (res?.user) {
        updateUser(res.user);
        setSaveMessage("Profile updated successfully");
        setTimeout(() => setSaveMessage(null), 3000);
      }
    } catch (error) {
      setSaveError(error?.response?.data?.message || "Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetPassword = async () => {
    setIsResettingPassword(true);
    setResetMessage(null);
    try {
      await forgotPassword(user?.email);
      setResetMessage("Password reset instructions sent to your email.");
    } catch (error) {
      console.error(error);
      setResetMessage("Failed to send recovery email.");
    } finally {
      setIsResettingPassword(false);
    }
  };

  const firstName = user?.name || '';
  const lastName = user?.lastname || '';
  const email = user?.email || '';
  const displayName = getDisplayName(user, firstName, lastName);
  const initials = getInitials(user, '??');
  const displayRole = (role || 'user').toUpperCase();
  
  const createdAt = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }) : 'Recently';

  const isFormDirty = formData.name !== firstName || formData.lastname !== lastName;

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
              <p className="text-sm font-semibold text-[#0e1520]">{createdAt}</p>
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
                  name="name"
                  type="text"
                  className={inputClass}
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="given-name"
                  required
                />
              </div>
              <div className={fieldClass}>
                <label htmlFor="profile-last-name" className={labelClass}>
                  Last name
                </label>
                <input
                  id="profile-last-name"
                  name="lastname"
                  type="text"
                  className={inputClass}
                  value={formData.lastname}
                  onChange={handleChange}
                  autoComplete="family-name"
                  required
                />
              </div>
            </div>
            {(saveError || saveMessage) && (
              <div className="mt-4">
                {saveError && <p className="text-sm text-red-600">{saveError}</p>}
                {saveMessage && !isFormDirty && <p className="text-sm text-green-600 font-medium">{saveMessage}</p>}
              </div>
            )}
            <div className={profileSectionActionsClass}>
              <button 
                type="submit" 
                className={primaryButtonInlineClass}
                disabled={isSaving || !isFormDirty}
              >
                {isSaving ? "Saving..." : "Save changes"}
              </button>
              {isFormDirty && (
                <button
                  type="button"
                  onClick={handleCancelPersonalInfo}
                  className={secondaryButtonClass}
                  disabled={isSaving}
                >
                  Cancel
                </button>
              )}
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
          <div className={`${profileSectionActionsClass} justify-start flex-col items-start gap-3`}>
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={handleResetPassword}
              disabled={isResettingPassword}
            >
              {isResettingPassword ? "Sending..." : "Change password"}
            </button>
            {resetMessage && (
              <p className="text-sm text-green-600 font-medium">{resetMessage}</p>
            )}
          </div>
        </ProfileSection>
      </div>

      <ChangeEmailModal
        isOpen={isEmailModalOpen}
        currentEmail={email}
        onCancel={() => setIsEmailModalOpen(false)}
      />
    </div>
  );
};
