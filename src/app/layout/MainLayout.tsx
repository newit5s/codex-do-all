import { Outlet, NavLink } from 'react-router-dom';
import { LanguageSwitcher } from '@shared/components/LanguageSwitcher';
import { BranchSwitcher } from '@shared/components/BranchSwitcher';
import { useAuth, UserRole } from '@auth/AuthContext';
import { useTranslation } from 'react-i18next';

const navigation = [
  { to: '/dashboard', labelKey: 'navigation.dashboard', roles: ['super_admin', 'branch_admin', 'staff'] as UserRole[] },
  { to: '/bookings', labelKey: 'navigation.bookings', roles: ['super_admin', 'branch_admin', 'staff'] as UserRole[] },
  { to: '/tables', labelKey: 'navigation.tables', roles: ['super_admin', 'branch_admin'] as UserRole[] },
  { to: '/customers', labelKey: 'navigation.customers', roles: ['super_admin', 'branch_admin', 'staff'] as UserRole[] },
  { to: '/admin/settings', labelKey: 'navigation.settings', roles: ['super_admin', 'branch_admin'] as UserRole[] }
];

export const MainLayout = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-semibold text-brand-300">Aurora Hospitality Hub</h1>
            <p className="text-sm text-slate-400">{t('layout.subtitle')}</p>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <BranchSwitcher />
            {user ? (
              <div className="rounded border border-slate-700 px-3 py-1 text-sm text-slate-300">
                <p className="font-semibold">{user.displayName}</p>
                <p className="uppercase tracking-wide text-xs text-brand-200">{t(`roles.${user.role}`)}</p>
              </div>
            ) : null}
          </div>
        </div>
        <nav className="bg-slate-950/80">
          <div className="mx-auto flex max-w-7xl space-x-6 px-6">
            {navigation
              .filter((item) => (user ? item.roles.includes(user.role) : false))
              .map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'border-b-2 px-2 py-3 text-sm font-medium transition-colors',
                      isActive ? 'border-brand-400 text-brand-200' : 'border-transparent text-slate-400 hover:text-brand-200'
                    ].join(' ')
                  }
                >
                  {t(item.labelKey)}
                </NavLink>
              ))}
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};
