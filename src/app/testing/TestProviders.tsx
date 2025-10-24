import { ReactNode } from 'react';
import { I18nProvider } from '@app/providers/I18nProvider';
import { AuthProvider, AuthenticatedUser } from '@auth/AuthContext';
import { TenantProvider } from '@auth/TenantContext';
import { AppStateProvider } from '@store/AppStateContext';

interface TestProvidersProps {
  children: ReactNode;
  user?: AuthenticatedUser | null;
}

export const TestProviders = ({ children, user }: TestProvidersProps) => {
  return (
    <I18nProvider>
      <AuthProvider initialUser={user}>
        <TenantProvider>
          <AppStateProvider>{children}</AppStateProvider>
        </TenantProvider>
      </AuthProvider>
    </I18nProvider>
  );
};
