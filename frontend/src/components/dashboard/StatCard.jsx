import {
  dashboardCardClass,
  dashboardStatLabelClass,
  dashboardMetricValueClass,
} from '@/styles/prometeoStyleClasses.js';

export const StatCard = ({ label, value, children }) => (
  <div className={dashboardCardClass}>
    <p className={dashboardStatLabelClass}>{label}</p>
    {value !== undefined && <p className={dashboardMetricValueClass}>{value}</p>}
    {children}
  </div>
);
