import { createContext, useState, useCallback, useMemo } from "react";
import { setApiToken } from "@services/apiClient.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  const isAuthenticated = !!accessToken && !!user;

  const login = useCallback(({ accessToken: token, user: userData }) => {
    setApiToken(token);
    setAccessToken(token);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setApiToken(null);
    setAccessToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      accessToken,
      user,
      isAuthenticated,
      accountType: user?.accountType || null,
      role: user?.role || null,
      login,
      logout,
    }),
    [accessToken, user, isAuthenticated, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
