import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DashboardPageHeader } from '@components/dashboard/DashboardPageHeader.jsx';
import { StatusBadge } from '@components/dashboard/StatusBadge.jsx';
import { ConfirmModal } from '@components/dashboard/ConfirmModal.jsx';
import { Pagination } from '@components/dashboard/Pagination.jsx';
import { getSessions, revokeSession } from '@services/session.service.js';
import { useAuth } from '@hooks/useAuth.js';
import {
  dashboardRefreshButtonClass,
  dashboardTablePanelClass,
  dashboardTableHeadClass,
  dashboardTableRowClass,
  dashboardTableCellMutedClass,
  dashboardDestructiveButtonClass,
} from '@/styles/prometeoStyleClasses.js';

const SESSIONS_GRID =
  'md:grid-cols-[2fr_1.4fr_1fr_1fr_0.9fr] xl:grid-cols-[2fr_1.4fr_1fr_1fr_0.9fr]';
const SESSIONS_PAGE_SIZE = 15;

const mobileFieldLabelClass =
  'mb-1 text-[11px] font-bold uppercase tracking-[0.06em] text-[#8d9aad] md:hidden';

const timeSince = (dateString) => {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  const seconds = Math.floor((new Date() - date) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  return 'Just now';
};

export const ActiveSessions = () => {
  const navigate = useNavigate();
  const { tokenId: currentTokenId, logout } = useAuth();
  
  const [sessions, setSessions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  
  const [sessionToRevoke, setSessionToRevoke] = useState(null);
  const [isRevoking, setIsRevoking] = useState(false);
  const [revokeError, setRevokeError] = useState(null);

  const totalPages = Math.max(1, Math.ceil(sessions.length / SESSIONS_PAGE_SIZE));
  const paginatedSessions = sessions.slice(
    (currentPage - 1) * SESSIONS_PAGE_SIZE,
    currentPage * SESSIONS_PAGE_SIZE
  );

  const fetchSessions = useCallback(async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) setIsRefreshing(true);
      setError(null);
      const data = await getSessions();
      setSessions(data);
      setCurrentPage(1);
    } catch (err) {
      setError('Failed to load active sessions. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRevokeConfirm = async () => {
    if (!sessionToRevoke) return;
    
    setIsRevoking(true);
    setRevokeError(null);
    try {
      await revokeSession(sessionToRevoke);
      
      if (sessionToRevoke === currentTokenId) {
        setIsRevoking(false);
        setSessionToRevoke(null);
        logout();
        navigate('/login');
        return;
      }
      
      setSessions((prev) => {
        const updated = prev.filter((s) => s.id !== sessionToRevoke);
        const newTotalPages = Math.max(1, Math.ceil(updated.length / SESSIONS_PAGE_SIZE));
        if (paginatedSessions.length === 1 && currentPage > newTotalPages) {
          setCurrentPage(newTotalPages);
        }
        return updated;
      });
      setSessionToRevoke(null);
    } catch (err) {
      console.error('Failed to revoke session:', err);
      setRevokeError('Failed to revoke session. Please try again.');
      fetchSessions();
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Security"
        title="Active sessions"
        description="These are the devices where your account is currently signed in."
        action={
          <button 
            type="button" 
            className={`${dashboardRefreshButtonClass} ${isRefreshing ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={() => fetchSessions(true)}
            disabled={isLoading || isRefreshing}
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
        }
      />

      <div className={`${dashboardTablePanelClass} max-md:border-0 max-md:bg-transparent max-md:shadow-none`}>
        <div className={`${dashboardTableHeadClass} ${SESSIONS_GRID} hidden md:grid`}>
          <div>Device</div>
          <div>Location / IP</div>
          <div>Last activity</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-[rgba(14,21,32,0.08)] bg-white p-8 text-center text-slate-500 md:border-0 md:bg-transparent">
            <Loader2 className="animate-spin mx-auto mb-2 text-slate-400" size={24} />
            <p>Loading sessions...</p>
          </div>
        ) : error && sessions.length === 0 ? (
          <div className="rounded-2xl border border-[rgba(14,21,32,0.08)] bg-white p-8 text-center text-red-500 md:border-0 md:bg-transparent">
            <p>{error}</p>
          </div>
        ) : sessions.length === 0 ? (
          <div className="rounded-2xl border border-[rgba(14,21,32,0.08)] bg-white p-8 text-center text-slate-500 md:border-0 md:bg-transparent">
            <p>No active sessions found.</p>
          </div>
        ) : (
          <div className="max-md:space-y-3">
          {paginatedSessions.map((session) => {
            const isCurrent = session.id === currentTokenId;
            
            return (
              <div
                key={session.id}
                className={`${dashboardTableRowClass} max-md:mx-0 max-md:rounded-xl max-md:border max-md:border-[rgba(14,21,32,0.08)] max-md:bg-white max-md:p-4 max-md:shadow-[0_1px_2px_rgba(14,21,32,0.04)] max-md:last:border-b md:grid ${SESSIONS_GRID}`}
              >
                <div>
                  <p className={mobileFieldLabelClass}>Device</p>
                  <div>{`${session.device.browser} on ${session.device.os}`}</div>
                </div>
                <div>
                  <p className={mobileFieldLabelClass}>Location / IP</p>
                  <div className={dashboardTableCellMutedClass}>{session.ipAddress}</div>
                </div>
                <div>
                  <p className={mobileFieldLabelClass}>Last activity</p>
                  <div className={dashboardTableCellMutedClass}>{timeSince(session.lastActiveAt)}</div>
                </div>
                <div>
                  <p className={mobileFieldLabelClass}>Status</p>
                  {isCurrent ? (
                    <StatusBadge variant="success">Current session</StatusBadge>
                  ) : (
                    <StatusBadge variant="neutral">Active</StatusBadge>
                  )}
                </div>
                <div className="max-md:pt-1">
                  <p className={mobileFieldLabelClass}>Action</p>
                  <button 
                    type="button" 
                    className={dashboardDestructiveButtonClass}
                    onClick={() => {
                      setRevokeError(null);
                      setSessionToRevoke(session.id);
                    }}
                  >
                    Revoke
                  </button>
                </div>
              </div>
            );
          })}
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={sessions.length}
          pageSize={SESSIONS_PAGE_SIZE}
          onPageChange={handlePageChange}
        />
      </div>

      <ConfirmModal
        isOpen={!!sessionToRevoke}
        title="Revoke session?"
        description={
          sessionToRevoke === currentTokenId
            ? "You are about to revoke your current session. You will be logged out immediately."
            : "Are you sure you want to sign out from this device? It will be disconnected immediately."
        }
        cancelLabel="Cancel"
        confirmLabel={sessionToRevoke === currentTokenId ? "Log out" : "Revoke session"}
        isLoading={isRevoking}
        error={revokeError}
        onCancel={() => {
          if (!isRevoking) setSessionToRevoke(null);
        }}
        onConfirm={handleRevokeConfirm}
      />
    </div>
  );
};
