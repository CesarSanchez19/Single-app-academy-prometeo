import {
  profileSectionClass,
  profileSectionTitleClass,
  profileSectionDescriptionClass,
} from '@/styles/prometeoStyleClasses.js';

export const ProfileSection = ({ title, description, children, className = '' }) => (
  <section className={`${profileSectionClass} ${className}`.trim()}>
    <h2 className={profileSectionTitleClass}>{title}</h2>
    {description && <p className={profileSectionDescriptionClass}>{description}</p>}
    {children}
  </section>
);
