import { pageCardClass, titleClass, descriptionClass } from '@/styles/prometeoStyleClasses.js';

export const ActiveSessions = () => {
  return (
    <div className={pageCardClass}>
      <h1 className={titleClass}>Active Sessions</h1>
      <p className={descriptionClass}>Active sessions view.</p>
    </div>
  );
};
