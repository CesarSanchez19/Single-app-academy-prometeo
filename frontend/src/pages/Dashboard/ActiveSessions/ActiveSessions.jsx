import { RefreshCw } from 'lucide-react';
import { DashboardPageHeader } from '@components/dashboard/DashboardPageHeader.jsx';
import { StatusBadge } from '@components/dashboard/StatusBadge.jsx';
import {
  dashboardRefreshButtonClass,
  dashboardTablePanelClass,
  dashboardTableHeadClass,
  dashboardTableRowClass,
  dashboardTableCellMutedClass,
  dashboardTableCellMetaClass,
  dashboardDestructiveButtonClass,
} from '@/styles/prometeoStyleClasses.js';

const SESSIONS_GRID =
  'grid-cols-[2fr_1.4fr_1fr_1fr_0.9fr] max-xl:grid-cols-[1.5fr_1.2fr_1fr_1fr_0.9fr]';

const MOCK_SESSIONS = [
  {
    id: 1,
    device: 'Chrome on Windows',
    location: '190.221.14.9 · Buenos Aires',
    lastActivity: '2 min ago',
    status: 'current',
  },
  {
    id: 2,
    device: 'Safari on iPhone',
    location: '190.221.14.9 · Buenos Aires',
    lastActivity: '18 min ago',
    status: 'active',
  },
  {
    id: 3,
    device: 'Firefox on macOS',
    location: '45.12.88.3 · Córdoba',
    lastActivity: '3 h ago',
    status: 'active',
  },
  {
    id: 4,
    device: 'Edge on Windows',
    location: '201.55.6.12 · Rosario',
    lastActivity: '2 days ago',
    status: 'active',
  },
];

export const ActiveSessions = () => (
  <div>
    <DashboardPageHeader
      eyebrow="Security"
      title="Active sessions"
      description="These are the devices where your account is currently signed in."
      action={
        <button type="button" className={dashboardRefreshButtonClass}>
          <RefreshCw size={16} />
          Refresh
        </button>
      }
    />

    <div className={dashboardTablePanelClass}>
      <div className={`${dashboardTableHeadClass} ${SESSIONS_GRID}`}>
        <div>Device</div>
        <div>Location / IP</div>
        <div>Last activity</div>
        <div>Status</div>
        <div>Action</div>
      </div>

      {MOCK_SESSIONS.map((session) => (
        <div key={session.id} className={`${dashboardTableRowClass} ${SESSIONS_GRID}`}>
          <div>{session.device}</div>
          <div className={dashboardTableCellMutedClass}>{session.location}</div>
          <div className={dashboardTableCellMutedClass}>{session.lastActivity}</div>
          <div>
            {session.status === 'current' ? (
              <StatusBadge variant="success">Current session</StatusBadge>
            ) : (
              <StatusBadge variant="neutral">Active</StatusBadge>
            )}
          </div>
          <div>
            {session.status === 'current' ? (
              <span className={dashboardTableCellMetaClass}>—</span>
            ) : (
              <button type="button" className={dashboardDestructiveButtonClass}>
                Revoke
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
