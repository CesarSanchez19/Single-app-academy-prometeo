import { RefreshCw } from 'lucide-react';
import { DashboardPageHeader } from '@components/dashboard/DashboardPageHeader.jsx';
import { StatusBadge } from '@components/dashboard/StatusBadge.jsx';
import {
  dashboardRefreshButtonClass,
  dashboardMetricsGridClass,
  dashboardCardClass,
  dashboardStatLabelClass,
  dashboardMetricValueSmClass,
  dashboardTablePanelClass,
  dashboardTableHeadClass,
  dashboardTableRowClass,
  dashboardTableCellMutedClass,
} from '@/styles/prometeoStyleClasses.js';

const LOGS_GRID = 'grid-cols-[1.1fr_2.4fr_1.2fr_0.9fr]';

const MOCK_METRICS = [
  { label: 'Server uptime', value: '14d 6h 32m' },
  { label: 'Total active sessions', value: '128' },
  { label: 'Memory usage', value: '62%' },
  { label: 'Registered users', value: '342' },
];

const MOCK_LOGS = [
  {
    id: 1,
    timestamp: '07/23 10:41',
    event: 'Successful login',
    user: 'sofia.martin',
    severity: 'info',
  },
  {
    id: 2,
    timestamp: '07/23 09:58',
    event: 'Unauthorized admin route access attempt',
    user: 'carlos.diaz',
    severity: 'warning',
  },
  {
    id: 3,
    timestamp: '07/23 08:20',
    event: 'Database connection failure (retried)',
    user: 'system',
    severity: 'error',
  },
  {
    id: 4,
    timestamp: '07/22 23:11',
    event: 'Session manually revoked',
    user: 'admin.rodriguez',
    severity: 'info',
  },
];

const severityVariant = {
  info: 'neutral',
  warning: 'warning',
  error: 'error',
};

const severityLabel = {
  info: 'Info',
  warning: 'Warning',
  error: 'Error',
};

export const Monitoring = () => (
  <div>
    <DashboardPageHeader
      eyebrow="Administration"
      title="System diagnostics"
      action={
        <button type="button" className={dashboardRefreshButtonClass}>
          <RefreshCw size={16} />
          Refresh metrics
        </button>
      }
    />

    <div className={dashboardMetricsGridClass}>
      {MOCK_METRICS.map((metric) => (
        <div key={metric.label} className={dashboardCardClass}>
          <p className={dashboardStatLabelClass}>{metric.label}</p>
          <p className={dashboardMetricValueSmClass}>{metric.value}</p>
        </div>
      ))}
    </div>

    <div className={dashboardTablePanelClass}>
      <div className={`${dashboardTableHeadClass} ${LOGS_GRID}`}>
        <div>Timestamp</div>
        <div>Event</div>
        <div>User</div>
        <div>Severity</div>
      </div>

      {MOCK_LOGS.map((log) => (
        <div key={log.id} className={`${dashboardTableRowClass} ${LOGS_GRID} text-[13px]`}>
          <div className={dashboardTableCellMutedClass}>{log.timestamp}</div>
          <div>{log.event}</div>
          <div className={dashboardTableCellMutedClass}>{log.user}</div>
          <div>
            <StatusBadge variant={severityVariant[log.severity]}>
              {severityLabel[log.severity]}
            </StatusBadge>
          </div>
        </div>
      ))}
    </div>
  </div>
);
