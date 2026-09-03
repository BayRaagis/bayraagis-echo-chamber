
import { createContext, useContext, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';

/**
 * Admin auth is not wired to any backend right now. The Supabase integration
 * that used to back it was removed because nothing on the public site read
 * from it (artists come from the Google Sheet, events from src/utils/eventsData.ts,
 * contact from a Google Form).
 *
 * The admin shell under /admin is kept as scaffolding. To make it work again,
 * replace the stubs below with a real auth provider and drop the guard in
 * src/pages/admin/Dashboard.tsx.
 */

interface AdminUser {
  id: string;
  email?: string;
}

interface AuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const signIn = async () => {
    toast({
      title: "Admin login unavailable",
      description: "No authentication backend is configured for this site.",
      variant: "destructive",
    });
    throw new Error('No authentication backend is configured.');
  };

  const signOut = async () => {
    // Nothing to sign out of yet.
  };

  const value: AuthContextType = {
    user: null,
    isLoading: false,
    isAdmin: false,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
