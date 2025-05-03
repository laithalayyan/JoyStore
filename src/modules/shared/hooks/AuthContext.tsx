import { createContext, useContext, useState, useEffect } from "react";
import { authApi, AuthResponse, User, UserRole } from "../../../api/auth/auth";

export type AuthContextType = {
  user: string | null;
  userRole: UserRole | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (user: User) => Promise<AuthResponse>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = authApi.getSession();
    setUser(session?.email || null);
    setUserRole(session?.role || null);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.signIn(email, password);
    if (response.success) {
      setUser(email);
      setUserRole(response.role || "user");
    }
    return response;
  };

  const signup = async (user: User) => {
    const response = await authApi.signUp(user);
    if (response.success) setUser(user.email);
    return response;
  };

  const logout = () => {
    authApi.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, userRole, login, signup, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
