'use client';

import * as React from 'react';
import AuthContext from './auth-context';

interface AuthProviderProps {
  children: React.ReactNode;
  initialAuthState?: boolean;
}

export const AuthProvider = ({
  children,
  initialAuthState = false,
}: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] =
    React.useState(initialAuthState);

  const mockAuthObj = React.useMemo(
    () => ({ isAuthenticated, setIsAuthenticated }),
    [isAuthenticated, setIsAuthenticated]
  );

  return (
    <AuthContext.Provider value={mockAuthObj}>{children}</AuthContext.Provider>
  );
};
