import { Link } from 'react-router-dom';
import './PublicFooter.css';

export const PublicFooter = () => {
  return (
    <footer className="public-footer">
      <div className="footer-container">
        <p className="text-muted footer-copyright">
          © 2026 Prometeo by Galetics. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
