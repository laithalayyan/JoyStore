export type UserRole = 'user' | 'admin';

export type User = {
    email: string;
    password: string;
    username?: string;
    role?: UserRole;
};
 export type AuthResponse = {
    success: boolean;
    error?: string;
    role?: UserRole;
  };
  
  // Mock database using localStorage
  const LS_KEY_USERS = 'auth_users';
  const LS_KEY_SESSION = 'auth_session';
  
  export const authApi = {
    // Sign up new user
    async signUp(user: User): Promise<AuthResponse> {
        const newUser = { ...user, role: user.role || 'user' };

        if (newUser.password.length < 8) {
            return { success: false, error: 'password-too-short' };
          }

        const users = JSON.parse(localStorage.getItem(LS_KEY_USERS) || '[]');
        
        if (users.some((u: User) => u.email === user.email)) {
          return { success: false, error: 'email-exists' };
        }
    
        users.push(newUser);
        localStorage.setItem(LS_KEY_USERS, JSON.stringify(users));
        localStorage.setItem(LS_KEY_SESSION, JSON.stringify({ email: newUser.email, role: newUser.role }));
        
        return { success: true , role: newUser.role};
      },
  
    // Sign in existing user
    async signIn(email: string, password: string): Promise<AuthResponse> {
        const users = JSON.parse(localStorage.getItem(LS_KEY_USERS) || '[]');
        const user = users.find((u: User) => u.email.toLocaleLowerCase() === email.toLocaleLowerCase());
    
        if (!user) {
          return { success: false, error: 'email-not-found' };
        }

        if (user.password !== password) {
            return { success: false, error: 'wrong-password' };
          }
    
        localStorage.setItem(LS_KEY_SESSION, JSON.stringify({ email: user.email , role: user.role || 'user' }));
        return { success: true, role: user.role };
      },
  
    // Get current session
    getSession(): { email: string; role:UserRole } | null {
      const session = localStorage.getItem(LS_KEY_SESSION);
      return session ? JSON.parse(session) : null;
    },
  
    // Sign out
    signOut(): void {
      localStorage.removeItem(LS_KEY_SESSION);
    }
  };