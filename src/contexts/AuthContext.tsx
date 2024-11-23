import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('auth-token');
    setIsAuthenticated(!!token);
  }, []);

  const login = () => {
    Cookies.set('auth-token', 'mock-token', { expires: 1 });
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove('auth-token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={ { isAuthenticated, login, logout } }>
      { children }
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
