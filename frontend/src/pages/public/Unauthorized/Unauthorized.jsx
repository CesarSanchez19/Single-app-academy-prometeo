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
  primaryButtonInlineClass,
  secondaryButtonClass,
} from '@/styles/prometeoStyleClasses.js';

export const Unauthorized = () => {
  const { pathname } = useLocation();

  return (
    <div className={notFoundStackClass}>
      <span className={notFoundEyebrowClass}>Error 401</span>
      <h1 className={notFoundTitleClass}>Authentication required</h1>
      <p className={notFoundLeadClass}>
        You need to sign in to access this section of Prometeo. Please log in with your credentials to continue.
      </p>

      <div className={notFoundRecordClass}>
        <span className={notFoundRecordTitleClass}>Request</span>

        <div className={notFoundRecordRowClass}>
          <span className={notFoundRecordLabelClass}>Path</span>
          <span className={notFoundRecordValueClass}>{pathname}</span>
        </div>

        <div className={notFoundRecordRowClass}>
          <span className={notFoundRecordLabelClass}>Status</span>
          <span className={notFoundRecordErrorClass}>401 Unauthorized</span>
        </div>

        <div className={notFoundRecordRowClass}>
          <span className={notFoundRecordLabelClass}>Source</span>
          <span className={notFoundRecordValueClass}>React Router</span>
        </div>
      </div>

      <div className={notFoundActionsClass}>
        <Link to="/login" className={primaryButtonInlineClass}>
          Sign in
          <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
        </Link>
        <Link to="/" className={secondaryButtonClass}>
          Back to home
        </Link>
      </div>
    </div>
  );
};
