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

export const AccessDenied = () => {
  const { pathname } = useLocation();

  return (
    <div className={notFoundStackClass}>
      <span className={notFoundEyebrowClass}>Error 403</span>
      <h1 className={notFoundTitleClass}>Access denied</h1>
      <p className={notFoundLeadClass}>
        This section is reserved for administrators. Your current account does not have the necessary permissions to view this content.
      </p>

      <div className={notFoundRecordClass}>
        <span className={notFoundRecordTitleClass}>Request</span>

        <div className={notFoundRecordRowClass}>
          <span className={notFoundRecordLabelClass}>Path</span>
          <span className={notFoundRecordValueClass}>{pathname}</span>
        </div>

        <div className={notFoundRecordRowClass}>
          <span className={notFoundRecordLabelClass}>Status</span>
          <span className={notFoundRecordErrorClass}>403 Forbidden</span>
        </div>

        <div className={notFoundRecordRowClass}>
          <span className={notFoundRecordLabelClass}>Source</span>
          <span className={notFoundRecordValueClass}>React Router</span>
        </div>
      </div>

      <div className={notFoundActionsClass}>
        <Link to="/login" className={primaryButtonInlineClass}>
          Sign in with admin account
          <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
        </Link>
        <Link to="/dashboard/home" className={secondaryButtonClass}>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};
