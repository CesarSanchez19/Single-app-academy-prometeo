import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'prometeo_sidebar_collapsed';

const DashboardSidebarContext = createContext(null);

const readCollapsedPreference = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY) === 'true';
};

export const DashboardSidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(readCollapsedPreference);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  const openMobile = useCallback(() => setIsMobileOpen(true), []);
  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  useEffect(() => {
    if (!isMobileOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileOpen]);

  const value = useMemo(
    () => ({
      isCollapsed,
      isMobileOpen,
      toggleCollapsed,
      openMobile,
      closeMobile,
    }),
    [isCollapsed, isMobileOpen, toggleCollapsed, openMobile, closeMobile]
  );

  return (
    <DashboardSidebarContext.Provider value={value}>
      {children}
    </DashboardSidebarContext.Provider>
  );
};

export const useDashboardSidebar = () => {
  const context = useContext(DashboardSidebarContext);
  if (!context) {
    throw new Error('useDashboardSidebar must be used within DashboardSidebarProvider');
  }
  return context;
};
