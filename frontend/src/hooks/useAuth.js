import { useState } from 'react';

/**
 * Mock temporal de autenticación para simular RBAC sin backend.
 * 
 * Configura los valores por defecto aquí para probar los diferentes guardias:
 * - isAuthenticated: true/false
 * - accountType: 'admin' | 'user'
 * - role: 'property' | 'employee' | null
 * - hasBusiness: true/false
 */
export const useAuth = () => {
  // Valores estáticos de prueba (puedes cambiarlos manualemente para probar las rutas)
  const [authState] = useState({
    isAuthenticated: true, 
    accountType: 'admin', // 'admin' | 'user'
    role: 'property', // 'property' | 'employee'
    hasBusiness: true, // Si el admin ya registró su negocio
  });

  return authState;
};
