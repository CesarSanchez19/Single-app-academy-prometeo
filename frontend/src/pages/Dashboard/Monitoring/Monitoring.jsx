import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Loader2 } from 'lucide-react';
import { DashboardPageHeader } from '@components/dashboard/DashboardPageHeader.jsx';
import { StatusBadge } from '@components/dashboard/StatusBadge.jsx';
import { getSystemLogs } from '@services/admin.service.js';
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

export const Monitoring = () => {
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchMetrics = useCallback(async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) setIsRefreshing(true);
      setError(null);
      const data = await getSystemLogs();
      setMetrics([
        { label: 'Server uptime', value: data.uptime || 'Unknown' },
        { label: 'Total active sessions', value: data.activeSessions?.toString() || '0' },
        { label: 'Memory usage', value: data.memory?.percent || 'Unknown' },
        { label: 'Registered users', value: data.totalUsers?.toString() || '0' },
      ]);
    } catch (err) {
      setError('Failed to load system metrics. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Administration"
        title="System diagnostics"
        action={
          <button 
            type="button" 
            className={`${dashboardRefreshButtonClass} ${isRefreshing ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={() => fetchMetrics(true)}
            disabled={isLoading || isRefreshing}
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
            Refresh metrics
          </button>
        }
      />

      <div className={dashboardMetricsGridClass}>
        {isLoading ? (
          <div className="col-span-4 p-8 text-center text-slate-500 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin mb-2 text-slate-400" size={24} />
            <p>Loading metrics...</p>
          </div>
        ) : error ? (
          <div className="col-span-4 p-8 text-center text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          metrics?.map((metric) => (
            <div key={metric.label} className={dashboardCardClass}>
              <p className={dashboardStatLabelClass}>{metric.label}</p>
              <p className={dashboardMetricValueSmClass}>{metric.value}</p>
            </div>
          ))
        )}
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
};
