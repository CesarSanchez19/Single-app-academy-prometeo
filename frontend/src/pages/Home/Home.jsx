import { useHealth } from "@hooks/useHealth.js";

export const Home = () => {
  const { health, isLoading, error } = useHealth();

  const renderStatus = () => {
    if (isLoading) return "Verificando conexión...";
    if (error) return error;
    return health?.message ?? "Sin datos";
  };

  return (
    <main>
      <h1>Prometeo</h1>
      <p>Monorepo React + Vite / Express + MongoDB Atlas</p>
      <p>Estado del backend: {renderStatus()}</p>
    </main>
  );
};