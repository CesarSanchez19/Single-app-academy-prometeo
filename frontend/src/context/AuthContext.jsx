import { createContext, useState, useCallback, useMemo } from "react";
import { setApiToken } from "@services/apiClient.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [tokenId, setTokenId] = useState(null);

  const isAuthenticated = !!accessToken && !!user;

  const login = useCallback(({ accessToken: token, user: userData, tokenId: tId }) => {
    setApiToken(token);
    setAccessToken(token);
    setUser(userData);
    setTokenId(tId);
  }, []);

  const logout = useCallback(() => {
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
