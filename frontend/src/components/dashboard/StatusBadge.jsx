import {
  dashboardBadgeNeutralClass,
  dashboardBadgeSuccessClass,
  dashboardBadgeWarningClass,
  dashboardBadgeErrorClass,
  dashboardBadgeAccentClass,
} from '@/styles/prometeoStyleClasses.js';

const variantClass = {
  neutral: dashboardBadgeNeutralClass,
  success: dashboardBadgeSuccessClass,
  warning: dashboardBadgeWarningClass,
  error: dashboardBadgeErrorClass,
  accent: dashboardBadgeAccentClass,
};

export const StatusBadge = ({ variant = 'neutral', children }) => (
  <span className={variantClass[variant]}>{children}</span>
);
