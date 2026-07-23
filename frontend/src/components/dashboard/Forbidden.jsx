import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import {
  forbiddenWrapperClass,
  forbiddenCardClass,
  forbiddenIconWrapperClass,
  forbiddenEyebrowClass,
  forbiddenTitleClass,
  forbiddenDescriptionClass,
  primaryButtonInlineClass,
} from '@/styles/prometeoStyleClasses.js';

export const Forbidden = () => (
  <div className={forbiddenWrapperClass}>
    <div className={forbiddenCardClass}>
      <div className={forbiddenIconWrapperClass}>
        <Lock size={24} className="text-[#dc2626]" aria-hidden />
      </div>
      <p className={forbiddenEyebrowClass}>Restricted access</p>
      <h1 className={forbiddenTitleClass}>You don&apos;t have permission to view this</h1>
      <p className={forbiddenDescriptionClass}>
        This section is reserved for administrators.
      </p>
      <Link to="/dashboard/home" className={primaryButtonInlineClass}>
        Back to Dashboard
      </Link>
    </div>
  </div>
);
