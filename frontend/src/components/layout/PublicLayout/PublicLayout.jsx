import { Outlet } from 'react-router-dom';
import { backdropClass, shellClass, shellInnerClass, publicMainClass } from '@/styles/prometeoStyleClasses.js';
import { PublicHeader } from './Header/PublicHeader.jsx';
import { PublicFooter } from './Footer/PublicFooter.jsx';

export const PublicLayout = () => {
  return (
    <div className={`${shellClass} isolate`}>
      <div className={backdropClass} aria-hidden="true" />

      <div className={shellInnerClass}>
        <PublicHeader />
        <main className={publicMainClass}>
          <Outlet />
        </main>
        <PublicFooter />
      </div>
    </div>
  );
};
