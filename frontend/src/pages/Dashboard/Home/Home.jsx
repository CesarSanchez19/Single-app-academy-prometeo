import { Link } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth.js';
import { StatCard } from '@components/dashboard/StatCard.jsx';
import { StatusBadge } from '@components/dashboard/StatusBadge.jsx';
import {
  dashboardPageEyebrowClass,
  dashboardPageTitleClass,
  dashboardPageDescriptionClass,
  dashboardPageIntroClass,
  dashboardStatGridClass,
  dashboardLinkClass,
  dashboardStatLabelClass,
  dashboardCardClass,
} from '@/styles/prometeoStyleClasses.js';

const MOCK_NAME = 'Sofía Martín';

const formatWelcomeDate = () => {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const DashboardHome = () => {
  const { user, role } = useAuth();
  const displayName = user?.name || user?.username || MOCK_NAME;
  const displayRole = (role || 'admin').toUpperCase();

  return (
    <div>
      <header className={dashboardPageIntroClass}>
        <p className={dashboardPageEyebrowClass}>Welcome</p>
        <h1 className={dashboardPageTitleClass}>Hello, {displayName}</h1>
        <p className={dashboardPageDescriptionClass}>
          {formatWelcomeDate()} · 10:42 — your account is active and in good standing.
        </p>
      </header>

      <div className={dashboardStatGridClass}>
        <StatCard label="Active sessions" value="3">
          <p className="mt-3.5">
            <Link to="/dashboard/active-sessions" className={dashboardLinkClass}>
              View all →
            </Link>
          </p>
        </StatCard>

        <StatCard label="Current role">
          <StatusBadge variant="accent">{displayRole}</StatusBadge>
        </StatCard>

        <div className={dashboardCardClass}>
          <p className={dashboardStatLabelClass}>Last access</p>
          <p className="text-[15px] font-semibold text-[#0e1520]">Today, 09:15</p>
          <p className="mt-1 text-[13px] text-[#8d9aad]">Chrome on Windows</p>
        </div>
      </div>
    </div>
  );
};
