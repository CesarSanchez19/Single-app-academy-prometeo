import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth.js';
import { StatCard } from '@components/dashboard/StatCard.jsx';
import { StatusBadge } from '@components/dashboard/StatusBadge.jsx';
import { dashboardService } from '@/services/dashboard.service.js';
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

const formatWelcomeDate = () => {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Cancun'
  });
};

const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Cancun'
  });
};

const formatFullDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Cancun'
  });
};

export const DashboardHome = () => {
  const { user, role } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const displayName = user?.name 
    ? `${user.name} ${user.lastname || ''}`.trim() 
    : 'User';
  
  const displayRole = (role || 'user').toUpperCase();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const res = await dashboardService.getUserDashboard();
        setData(res);
      } catch (err) {
        console.error("Error loading the dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div>
      <header className={dashboardPageIntroClass}>
        <p className={dashboardPageEyebrowClass}>Welcome</p>
        <h1 className={dashboardPageTitleClass}>Hello, {displayName}</h1>
        <p className={dashboardPageDescriptionClass}>
          {formatWelcomeDate()} · {formatTime(new Date())} — your account is active and in good standing.
        </p>
      </header>

      <div className={dashboardStatGridClass}>
        <StatCard label="Active sessions" value={loading ? '...' : (data?.activeSessionsCount?.toString() || '0')}>
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
          <p className="text-[15px] font-semibold text-[#0e1520]">
            {loading ? '...' : (data?.lastAccess ? formatFullDate(data.lastAccess) : 'No data')}
          </p>
          <p className="mt-1 text-[13px] text-[#8d9aad]">Account Access</p>
        </div>
      </div>
    </div>
  );
};
