import { useHealth } from "@hooks/useHealth.js";

export const Home = () => {
  const { health, isLoading, error } = useHealth();

  const renderStatus = () => {
    if (isLoading) return <span className="text-muted">Verificando conexión...</span>;
    if (error) return <span style={{ color: 'var(--color-danger)' }}>{error}</span>;
    return <span style={{ color: 'var(--color-success)', fontWeight: 500 }}>{health?.message ?? "Sin datos"}</span>;
  };

  return (
    <div className="card text-center" style={{ maxWidth: '600px', margin: '0 auto', marginTop: '40px' }}>
      <h1 className="card-title" style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>Prometeo</h1>
      <p className="text-muted mb-4">Monorepo React + Vite / Express + MongoDB Atlas</p>
      
      <div style={{ padding: '16px', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)' }}>
        <p>Estado del backend: {renderStatus()}</p>
      </div>
      
      <div className="flex justify-center gap-4 mt-4">
        <button className="btn btn-primary">Empezar</button>
        <button className="btn btn-outline">Documentación</button>
      </div>
    </div>
  );
};
