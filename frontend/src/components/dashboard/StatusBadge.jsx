import {
  dashboardBadgeNeutralClass,
  dashboardBadgeSuccessClass,
  dashboardBadgeWarningClass,
  dashboardBadgeErrorClass,
  dashboardBadgeAccentClass,
  dashboardBadgeFatalClass,
  dashboardBadgeDebugClass,
  dashboardBadgeTraceClass,
  dashboardBadgeVerboseClass,
} from '@/styles/prometeoStyleClasses.js';

const variantClass = {
  neutral: dashboardBadgeNeutralClass,
  success: dashboardBadgeSuccessClass,
  warning: dashboardBadgeWarningClass,
  error: dashboardBadgeErrorClass,
  accent: dashboardBadgeAccentClass,
  fatal: dashboardBadgeFatalClass,
  debug: dashboardBadgeDebugClass,
  trace: dashboardBadgeTraceClass,
  verbose: dashboardBadgeVerboseClass,
};

export const StatusBadge = ({ variant = 'neutral', children }) => (
  <span className={variantClass[variant]}>{children}</span>
);
