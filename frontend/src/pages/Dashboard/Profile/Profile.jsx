import { useAuth } from '@hooks/useAuth.js';
import { DashboardPageHeader } from '@components/dashboard/DashboardPageHeader.jsx';
import { StatusBadge } from '@components/dashboard/StatusBadge.jsx';
import {
  profileCardClass,
  profileAvatarClass,
  profileHeaderClass,
  profileMetaGridClass,
  profileMetaLabelClass,
  secondaryButtonClass,
} from '@/styles/prometeoStyleClasses.js';

const MOCK_PROFILE = {
  username: 'sofia.martin',
  email: 'sofia.martin@prometeo.dev',
  initials: 'SM',
  createdAt: 'March 14, 2024',
};

const getInitials = (user, fallback) => {
  if (user?.name) {
    return user.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }
  if (user?.username) {
    return user.username.slice(0, 2).toUpperCase();
  }
  return fallback;
};

export const Profile = () => {
  const { user, role } = useAuth();
  const username = user?.username || MOCK_PROFILE.username;
  const email = user?.email || MOCK_PROFILE.email;
  const initials = getInitials(user, MOCK_PROFILE.initials);
  const displayRole = (role || 'admin').toUpperCase();

  return (
    <div>
      <DashboardPageHeader eyebrow="Account" title="Your profile" />

      <div className={profileCardClass}>
        <div className={profileHeaderClass}>
          <div className={profileAvatarClass} aria-hidden>
            {initials}
          </div>
          <div>
            <p className="text-[17px] font-semibold text-[#0e1520]">{username}</p>
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

        <button type="button" className={secondaryButtonClass}>
          Change password
        </button>
      </div>
    </div>
  );
};
