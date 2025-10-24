import { ReactNode } from 'react';
import { I18nProvider } from '@app/providers/I18nProvider';
import { AuthProvider } from '@auth/AuthContext';
import { TenantProvider } from '@auth/TenantContext';
import { AppStateProvider } from '@store/AppStateContext';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  <I18nProvider>
    <AuthProvider>
      <TenantProvider>
        <AppStateProvider>{children}</AppStateProvider>
      </TenantProvider>
    </AuthProvider>
  </I18nProvider>
);
