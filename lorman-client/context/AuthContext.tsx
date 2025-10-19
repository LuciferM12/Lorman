import { UserType } from '@/interfaces/IUser';
import { storage, STORAGE_KEYS } from '@/lib/storage';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: UserType | null;
  token: string | null;
  loginAuth: (userData: UserType, token: string) => Promise<void>;
  logoutAuth: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedToken = await storage.getItem(STORAGE_KEYS.TOKEN);
        const storedUser = await storage.getItem(STORAGE_KEYS.USER_DATA);
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading stored data:', error);
        await logoutAuth();
      } finally {
        setLoading(false);
      }
    };
    loadStoredData();
  }, []);

  const loginAuth = async (userData: UserType, authToken: string) => {
    try {
      await storage.setItem(STORAGE_KEYS.TOKEN, authToken);
      await storage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));

      setUser(userData);
      setToken(authToken);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logoutAuth = async () => {
    try {
      await storage.removeItem(STORAGE_KEYS.TOKEN);
      await storage.removeItem(STORAGE_KEYS.USER_DATA);
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    loginAuth,
    logoutAuth,
    isAuthenticated: !!token && !!user,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
