import { Outlet } from 'react-router-dom';
import { PublicHeader } from './Header/PublicHeader.jsx';
import { PublicFooter } from './Footer/PublicFooter.jsx';
import './PublicLayout.css';

export const PublicLayout = () => {
  return (
    <div className="public-layout">
      <PublicHeader />
      <main className="public-layout__main">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};
