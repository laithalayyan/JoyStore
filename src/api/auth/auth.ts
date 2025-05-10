// src/api/auth/auth.ts

export type UserRole = 'user' | 'admin';

export type User = {
  id: string | number;
  email: string;
  password: string;
  username?: string;
  role: UserRole;
};

// This is the AuthResponse structure your SignInForm and AuthContext expect
export type AuthResponse = {
  success: boolean;
  error?: string;
  user?: { email: string; role: UserRole; username?: string }; // Keep this structure
};

// --- PLAIN In-Memory User Array ---
const usersDatabase: User[] = [
  { id: 1, email: "admin@example.com", password: "securepassword123", username: "Admin User", role: "admin" },
  { id: 2, email: "user@example.com", password: "password123", username: "Test User", role: "user" },
];
let currentUserSession: { email: string; role: UserRole; username?: string } | null = null;
// --- End PLAIN In-Memory User Array ---


export const authApi = {
  // Sign up - keeping it simple, just adds to the array if email not taken
  signUp(userData: Omit<User, 'id'>): AuthResponse { // Synchronous
    const { email, password, username, role } = userData;

    if (!email || !password) {
      return { success: false, error: 'missing-credentials' };
    }
    if (password.length < 8) {
      return { success: false, error: 'password-too-short' };
    }
    if (usersDatabase.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'email-exists' };
    }

    const newUser: User = {
      id: usersDatabase.length + 1, // Simple ID generation
      email: email.toLowerCase(),
      password: password,
      username: username || email.split('@')[0],
      role: role || 'user',
    };

    usersDatabase.push(newUser);
    currentUserSession = { email: newUser.email, role: newUser.role, username: newUser.username };
    console.log('[authApi.signUp] User added. Current DB:', usersDatabase);
    console.log('[authApi.signUp] Session set:', currentUserSession);
    return { success: true, user: currentUserSession };
  },

  // Sign in - checks the array
  signIn(email: string, password: string): AuthResponse { // Synchronous
    console.log('[authApi.signIn] Attempting signIn for:', email);
    const user = usersDatabase.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      console.log('[authApi.signIn] Email not found:', email);
      return { success: false, error: 'email-not-found' };
    }
    if (user.password !== password) {
      console.log('[authApi.signIn] Wrong password for:', email);
      return { success: false, error: 'wrong-password' };
    }

    currentUserSession = { email: user.email, role: user.role, username: user.username };
    console.log('[authApi.signIn] SignIn successful. Session set:', currentUserSession);
    return { success: true, user: currentUserSession };
  },

  // Get current session
  getSession(): { email: string; role: UserRole; username?: string } | null { // Synchronous
    console.log('[authApi.getSession] Returning session:', currentUserSession);
    return currentUserSession;
  },

  // Sign out
  signOut(): void { // Synchronous
    console.log('[authApi.signOut] Clearing session.');
    currentUserSession = null;
  }
};