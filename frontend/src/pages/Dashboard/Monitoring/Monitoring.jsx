import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Loader2 } from 'lucide-react';
import { DashboardPageHeader } from '@components/dashboard/DashboardPageHeader.jsx';
import { StatusBadge } from '@components/dashboard/StatusBadge.jsx';
import { Pagination } from '@components/dashboard/Pagination.jsx';
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
const LOGS_PAGE_SIZE = 10;

const formatLogTimestamp = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Cancun'
  });

  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'America/Cancun' }).format(date);
  const month = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'America/Cancun' }).format(date);
  const day = new Intl.DateTimeFormat('en-US', { day: '2-digit', timeZone: 'America/Cancun' }).format(date);
  const year = new Intl.DateTimeFormat('en-US', { year: 'numeric', timeZone: 'America/Cancun' }).format(date);
  const time = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Cancun' }).format(date);

  return `${weekday}/ ${month} ${day}/ ${year} ${time}`;
};

const severityVariant = {
  fatal: 'fatal',
  error: 'error',
  warn: 'warning',
  warning: 'warning',
  info: 'neutral',
  debug: 'debug',
  trace: 'trace',
  verbose: 'verbose',
};

const severityLabel = {
  fatal: 'Fatal',
  error: 'Error',
  warn: 'Warning',
  warning: 'Warning',
  info: 'Info',
  debug: 'Debug',
  trace: 'Trace',
  verbose: 'Verbose',
};

export const Monitoring = () => {
  const [metrics, setMetrics] = useState(null);
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const totalPages = Math.max(1, Math.ceil(logs.length / LOGS_PAGE_SIZE));
  const paginatedLogs = logs.slice(
    (currentPage - 1) * LOGS_PAGE_SIZE,
    currentPage * LOGS_PAGE_SIZE
  );

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
      setLogs(data.logs || []);
      setCurrentPage(1);
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

        {logs.length === 0 && !isLoading && (
          <div className="p-8 text-center text-slate-500 text-sm">
            No system logs recorded yet.
          </div>
        )}
        
        {paginatedLogs.map((log) => (
          <div key={log.id} className={`${dashboardTableRowClass} ${LOGS_GRID} text-[13px]`}>
            <div className={dashboardTableCellMutedClass}>{formatLogTimestamp(log.timestamp)}</div>
            <div>{log.event}</div>
            <div className={dashboardTableCellMutedClass}>{log.user}</div>
            <div>
              <StatusBadge variant={severityVariant[log.severity]}>
                {severityLabel[log.severity]}
              </StatusBadge>
            </div>
          </div>
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={logs.length}
          pageSize={LOGS_PAGE_SIZE}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
