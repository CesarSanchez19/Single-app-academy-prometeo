import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  notFoundStackClass,
  notFoundEyebrowClass,
  notFoundTitleClass,
  notFoundLeadClass,
  notFoundRecordClass,
  notFoundRecordTitleClass,
  notFoundRecordRowClass,
  notFoundRecordLabelClass,
  notFoundRecordValueClass,
  notFoundRecordErrorClass,
  notFoundActionsClass,
  notFoundLinksClass,
  notFoundLinksTitleClass,
  notFoundLinkRowClass,
  notFoundLinkClass,
  primaryButtonInlineClass,
  secondaryButtonClass,
} from '@/styles/prometeoStyleClasses.js';

const suggestions = [
  { to: '/', label: 'Home' },
  { to: '/about-us', label: 'About us' },
  { to: '/login', label: 'Sign in' },
  { to: '/signup', label: 'Create account' },
];

export const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <div className={notFoundStackClass}>
      <span className={notFoundEyebrowClass}>Error 404</span>
      <h1 className={notFoundTitleClass}>This route does not exist</h1>
      <p className={notFoundLeadClass}>
        The address you entered does not match any screen in Prometeo. The link
        may have been copied incorrectly, or the page may have been renamed.
      </p>

      <div className={notFoundRecordClass}>
        <span className={notFoundRecordTitleClass}>Request</span>

        <div className={notFoundRecordRowClass}>
          <span className={notFoundRecordLabelClass}>Path</span>
          <span className={notFoundRecordValueClass}>{pathname}</span>
        </div>

        <div className={notFoundRecordRowClass}>
          <span className={notFoundRecordLabelClass}>Status</span>
          <span className={notFoundRecordErrorClass}>404 Not Found</span>
        </div>

        <div className={notFoundRecordRowClass}>
          <span className={notFoundRecordLabelClass}>Source</span>
          <span className={notFoundRecordValueClass}>React Router</span>
        </div>
      </div>

      <div className={notFoundActionsClass}>
        <Link to="/" className={primaryButtonInlineClass}>
          Back to home
          <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
        </Link>
        <Link to="/login" className={secondaryButtonClass}>
          Sign in
        </Link>
      </div>

      <div className={notFoundLinksClass}>
        <span className={notFoundLinksTitleClass}>Available routes</span>

        <div className={notFoundLinkRowClass}>
          {suggestions.map(({ to, label }) => (
            <Link key={to} to={to} className={notFoundLinkClass}>{label}</Link>
          ))}
        </div>
      </div>
    </div>
  );
};