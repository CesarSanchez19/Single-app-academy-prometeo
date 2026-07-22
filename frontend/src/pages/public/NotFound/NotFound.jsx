import { Link } from 'react-router-dom';

export const NotFound = () => (
  <div className="card text-center" style={{ maxWidth: '480px', margin: '40px auto' }}>
    <h1 className="card-title">Página no encontrada</h1>
    <p className="text-muted mb-4">La ruta que buscas no existe o fue movida.</p>
    <Link to="/" className="btn btn-primary">Volver al inicio</Link>
  </div>
);
