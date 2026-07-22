import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useHealth } from '@hooks/useHealth.js';
import {
  heroCardClass,
  introClass,
  eyebrowClass,
  titleClass,
  descriptionClass,
  statusPillClass,
  statusLoadingClass,
  statusSuccessClass,
  statusErrorClass,
  actionsRowClass,
  primaryButtonInlineClass,
  secondaryButtonClass,
} from '@/styles/prometeoStyleClasses.js';

export const Home = () => {
  const { health, isLoading, error } = useHealth();

  const renderStatus = () => {
    if (isLoading) {
      return <span className={statusLoadingClass}>Verificando conexión...</span>;
    }
    if (error) {
      return <span className={statusErrorClass}>{error}</span>;
    }
    return (
      <span className={statusSuccessClass}>{health?.message ?? 'Sin datos'}</span>
    );
  };

  return (
    <div className={heroCardClass}>
      <div className={introClass}>
        <span className={eyebrowClass}>Prometeo</span>
        <h1 className={titleClass}>Gestión de academias, con claridad</h1>
        <p className={descriptionClass}>
          Organiza sesiones, clientes y equipos desde una plataforma pensada para
          academias que necesitan orden sin perder calidez.
        </p>
      </div>

      <div className={statusPillClass}>
        <span>Estado del backend: {renderStatus()}</span>
      </div>

      <div className={actionsRowClass}>
        <Link to="/login" className={primaryButtonInlineClass}>
          Empezar
          <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
        </Link>
        <Link to="/about-us" className={secondaryButtonClass}>
          Conocer más
        </Link>
      </div>
    </div>
  );
};
