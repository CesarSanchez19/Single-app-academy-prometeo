import { pageCardClass, titleClass, descriptionClass } from '@/styles/prometeoStyleClasses.js';

export const Profile = () => {
  return (
    <div className={pageCardClass}>
      <h1 className={titleClass}>Profile</h1>
      <p className={descriptionClass}>Profile view.</p>
    </div>
  );
};
