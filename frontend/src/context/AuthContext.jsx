import { createContext, useState, useCallback, useMemo } from "react";
import { setApiToken } from "@services/apiClient.js";

export const AuthContext = createContext(null);

const getStoredItem = (key) => {
  if (typeof window === 'undefined') return null;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('prometeo_auth_token') || null);
  const [user, setUser] = useState(() => getStoredItem('prometeo_auth_user'));
  const [tokenId, setTokenId] = useState(() => localStorage.getItem('prometeo_auth_tokenId') || null);

  const isAuthenticated = !!accessToken && !!user;

  const login = useCallback(({ accessToken: token, user: userData, tokenId: tId }) => {
    localStorage.setItem('prometeo_auth_token', token);
    localStorage.setItem('prometeo_auth_user', JSON.stringify(userData));
    localStorage.setItem('prometeo_auth_tokenId', tId);
    
    setApiToken(token);
    setAccessToken(token);
    setUser(userData);
    setTokenId(tId);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('prometeo_auth_token');
    localStorage.removeItem('prometeo_auth_user');
    localStorage.removeItem('prometeo_auth_tokenId');
    
    setApiToken(null);
    setAccessToken(null);
    setUser(null);
    setTokenId(null);
  }, []);

  const value = useMemo(
    () => ({
      accessToken,
      user,
      isAuthenticated,
      accountType: user?.accountType || null,
      role: user?.role || null,
      tokenId,
      login,
      logout,
    }),
    [accessToken, user, isAuthenticated, tokenId, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
