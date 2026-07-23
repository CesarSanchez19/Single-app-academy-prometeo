import { pageCardClass, titleClass, descriptionClass } from '@/styles/prometeoStyleClasses.js';

export const DashboardHome = () => {
  return (
    <div className={pageCardClass}>
      <h1 className={titleClass}>Home</h1>
      <p className={descriptionClass}>Dashboard home view.</p>
    </div>
  );
};
