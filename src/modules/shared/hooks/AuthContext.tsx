// src/shared/hooks/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { UserRole, AuthResponse, User, authApi } from "../../../api/auth/auth";
// Ensure this path is correct for the simplified authApi

export type AuthContextType = {
  user: { email: string; username?: string } | null;
  userRole: UserRole | null;
  // Keep async for function signature consistency with SignInForm
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (userData: Omit<User, "id">) => Promise<AuthResponse>;
  logout: () => void;
  loading: boolean; // This is for initial session load
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string; username?: string } | null>(
    null
  );
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true); // For initial session check

  useEffect(() => {
    console.log("[AuthContext] useEffect - Initializing session");
    const sessionData = authApi.getSession(); // Synchronous
    if (sessionData) {
      setUser({ email: sessionData.email, username: sessionData.username });
      setUserRole(sessionData.role);
      console.log("[AuthContext] Session loaded from authApi:", sessionData);
    } else {
      console.log("[AuthContext] No active session found.");
    }
    setLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    console.log("[AuthContext] login function called for:", email);
    // setLoading(true); // No need for global loading indicator for synchronous API call
    const response = authApi.signIn(email, password); // Synchronous call
    console.log("[AuthContext] authApi.signIn response:", response);
    if (response.success && response.user) {
      setUser({ email: response.user.email, username: response.user.username });
      setUserRole(response.user.role);
      console.log(
        "[AuthContext] User state updated. Role:",
        response.user.role
      );
    }
    // setLoading(false);
    return response; // Return plain response
  };

  const signup = async (userData: Omit<User, "id">): Promise<AuthResponse> => {
    // setLoading(true);
    const response = authApi.signUp(userData); // Synchronous call
    if (response.success && response.user) {
      setUser({ email: response.user.email, username: response.user.username });
      setUserRole(response.user.role);
    }
    // setLoading(false);
    return response;
  };

  const logout = () => {
    console.log("[AuthContext] logout function called");
    authApi.signOut(); // Synchronous
    setUser(null);
    setUserRole(null);
    console.log("[AuthContext] User state cleared.");
  };

  const isAdmin = userRole === "admin";

  return (
    <AuthContext.Provider
      value={{ user, userRole, login, signup, logout, loading, isAdmin }}
    >
      {/* Only render children after initial session check is complete */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
