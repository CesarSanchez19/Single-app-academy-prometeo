import { publicFooterClass, publicFooterInnerClass, footerTextClass } from '@/styles/prometeoStyleClasses.js';

export const PublicFooter = () => {
  return (
    <footer className={publicFooterClass}>
      <div className={publicFooterInnerClass}>
        <p className={footerTextClass}>
          © 2026 Prometeo by Galetics. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
