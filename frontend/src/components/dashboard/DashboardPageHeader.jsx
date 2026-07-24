import {
  dashboardPageHeaderClass,
  dashboardPageHeaderTextClass,
  dashboardPageEyebrowClass,
  dashboardPageTitleClass,
  dashboardPageDescriptionClass,
} from '@/styles/prometeoStyleClasses.js';

export const DashboardPageHeader = ({ eyebrow, title, description, action }) => (
  <header className={dashboardPageHeaderClass}>
    <div className={dashboardPageHeaderTextClass}>
      {eyebrow && <p className={dashboardPageEyebrowClass}>{eyebrow}</p>}
      <h1 className={dashboardPageTitleClass}>{title}</h1>
      {description && (
        <p className={`${dashboardPageDescriptionClass} max-w-[520px]`}>{description}</p>
      )}
    </div>
    {action && <div className="w-full shrink-0 md:w-auto [&_button]:w-full md:[&_button]:w-auto">{action}</div>}
  </header>
);
