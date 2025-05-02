
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  requestVerificationCode: (phoneNumber: string, email: string, password: string) => Promise<string | null>;
  verifyCode: (email: string, code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      
      if (event === 'SIGNED_IN') {
        checkAdminStatus(newSession?.user?.id);
      } else if (event === 'SIGNED_OUT') {
        setIsAdmin(false);
      }
    });

    // Initial session check
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        checkAdminStatus(currentSession.user.id);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkAdminStatus = async (userId: string | undefined) => {
    if (!userId) {
      setIsAdmin(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('is_verified')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        return;
      }
      
      setIsAdmin(data?.is_verified || false);
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      if (data?.user) {
        // Log authentication
        await logAdminAction('login', 'admin', data.user.id);
        
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Error during sign in:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      if (user) {
        // Log sign out
        await logAdminAction('logout', 'admin', user.id);
      }
      
      await supabase.auth.signOut();
      navigate('/admin/login');
      
      toast({
        title: "Logout Successful",
        description: "You have been logged out.",
      });
    } catch (error) {
      console.error('Error during sign out:', error);
      toast({
        title: "Logout Failed",
        description: "There was an error logging out.",
        variant: "destructive",
      });
    }
  };

  const requestVerificationCode = async (phoneNumber: string, email: string, password: string): Promise<string | null> => {
    try {
      const { data, error } = await supabase.functions.invoke('send-verification', {
        body: { phoneNumber, email, password },
      });
      
      if (error) {
        toast({
          title: "Verification Failed",
          description: error.message || "Failed to send verification code.",
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Verification Code Sent",
        description: "A verification code has been sent to your phone.",
      });
      
      // In development, return the code for easier testing
      return data.code || null;
    } catch (error) {
      console.error('Error requesting verification code:', error);
      throw error;
    }
  };

  const verifyCode = async (email: string, code: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-code', {
        body: { email, code },
      });
      
      if (error) {
        toast({
          title: "Verification Failed",
          description: error.message || "Invalid verification code.",
          variant: "destructive",
        });
        return false;
      }
      
      // If we have session data, set it
      if (data.session && data.user) {
        // In a real implementation, we would set the session here
        // However the edge function returns a magic link instead of a session
        // So we'll redirect to login
        toast({
          title: "Verification Successful",
          description: "You can now log in with your credentials.",
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error verifying code:', error);
      return false;
    }
  };

  const logAdminAction = async (actionType: string, entityType: string, entityId?: string, details?: any) => {
    if (!user) return;
    
    try {
      await supabase.functions.invoke('log-admin-action', {
        body: {
          action_type: actionType,
          entity_type: entityType,
          entity_id: entityId,
          details: details || {}
        }
      });
    } catch (error) {
      console.error('Error logging admin action:', error);
    }
  };

  const value = {
    user,
    session,
    isLoading,
    isAdmin,
    signIn,
    signOut,
    requestVerificationCode,
    verifyCode,
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
