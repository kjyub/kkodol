import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect,
} from 'react';

const LOCAL_STORAGE_AUTH_KEY = 'kkodol_auth';

type AuthState = 'loading' | 'authenticated' | 'unauthenticated';

const isAuth = (password: string | null): AuthState => {
  if (Number(import.meta.env.VITE_NO_AUTH)) return 'authenticated';

  if (!password) return 'unauthenticated';

  const passwordSegments = String(import.meta.env.VITE_PASSWORDS).split(',');
  return passwordSegments.some((segment) => password.includes(segment))
    ? 'authenticated'
    : 'unauthenticated';
};

interface AuthContextType {
  authState: AuthState;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const password = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

    setAuthState(isAuth(password));
  }, []);

  useEffect(() => {
    setIsAuthenticated(authState === 'authenticated');
  }, [authState]);

  const login = (password: string) => {
    const isAuthenticated = isAuth(password);

    if (isAuthenticated) {
      setAuthState(isAuthenticated);
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, password);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ authState, isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
