import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { Branch } from '@store/types';

export type UserRole = 'super_admin' | 'branch_admin' | 'staff';

export interface AuthenticatedUser {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  branchId?: Branch['id'];
}

interface AuthContextValue {
  user: AuthenticatedUser | null;
  signInAs: (user: AuthenticatedUser) => void;
  signOut: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const defaultUser: AuthenticatedUser = {
  id: '1',
  email: 'super.admin@aurora.example',
  displayName: 'Super Admin',
  role: 'super_admin'
};

interface AuthProviderProps {
  children: ReactNode;
  initialUser?: AuthenticatedUser | null;
}

export const AuthProvider = ({ children, initialUser }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(initialUser ?? defaultUser);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      signInAs: setUser,
      signOut: () => setUser(null),
      switchRole: (role: UserRole) => {
        setUser((current) => {
          if (!current) {
            return current;
          }
          return { ...current, role };
        });
      }
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
