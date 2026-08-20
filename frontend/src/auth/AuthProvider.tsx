import { useEffect, useMemo, useState, type ReactNode } from "react";

import {
  ACCESS_TOKEN_KEY,
  AUTH_UNAUTHORIZED_EVENT,
  AUTH_USER_KEY,
} from "@/auth/authConstants";
import { AuthContext, type AuthContextValue } from "@/auth/AuthContext";
import type { AuthResponse, AuthUser } from "@/types/auth";

type AuthProviderProps = {
  children: ReactNode;
};

function clearStoredAuth() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);

  localStorage.removeItem(AUTH_USER_KEY);
}

function getStoredUser(): AuthUser | null {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  const storedUser = localStorage.getItem(AUTH_USER_KEY);

  if (!token || !storedUser) {
    clearStoredAuth();

    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    clearStoredAuth();

    return null;
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());

  useEffect(() => {
    function handleUnauthorized() {
      clearStoredAuth();
      setUser(null);
    }

    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);

    return () => {
      window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
    };
  }, []);

  const login = (authResponse: AuthResponse) => {
    const authUser: AuthUser = {
      id: authResponse.userId,
      email: authResponse.email,
    };

    localStorage.setItem(ACCESS_TOKEN_KEY, authResponse.accessToken);

    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));

    setUser(authUser);
  };

  const logout = () => {
    clearStoredAuth();
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user && localStorage.getItem(ACCESS_TOKEN_KEY)),
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
