import { Loader2 } from 'lucide-react';

export const PageSpinner = () => (
  <div className="flex items-center justify-center" style={{ minHeight: '100vh', width: '100%' }}>
    <div className="flex-col items-center gap-4" style={{ color: 'var(--color-primary)' }}>
      <Loader2 className="animate-spin" size={48} style={{ animation: 'spin 1s linear infinite' }} />
      <div style={{ fontWeight: 500, color: 'var(--color-text-secondary)' }}>Cargando...</div>
    </div>
    <style>{`
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);
