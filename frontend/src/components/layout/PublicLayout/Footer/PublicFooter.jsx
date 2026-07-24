import { publicFooterClass, publicFooterInnerClass, footerTextClass } from '@/styles/prometeoStyleClasses.js';

export const PublicFooter = () => {
  return (
    <footer className={publicFooterClass}>
      <div className={publicFooterInnerClass}>
        <p className={footerTextClass}>
          © 2026 Prometeo by Galetics. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
