import { useMemo, useState } from 'react';
import { useAppDispatch, useAppState } from '@store/AppStateContext';
import { CustomerTier } from '@store/types';
import { useTenant } from '@auth/TenantContext';
import { useAuth } from '@auth/AuthContext';
import { useTranslation } from 'react-i18next';
import { maskContact } from '@shared/utils/privacy';

const tierColors: Record<CustomerTier, string> = {
  vip: 'text-emerald-300',
  regular: 'text-slate-200',
  blacklist: 'text-rose-300'
};

const CustomersPage = () => {
  const { customers } = useAppState();
  const { activeBranch } = useTenant();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState<CustomerTier | 'all'>('all');

  const canViewSensitiveContact = user?.role === 'super_admin' || user?.role === 'branch_admin';

  const branchCustomers = useMemo(
    () =>
      customers.filter((customer) => customer.branchId === activeBranch.id && (filter === 'all' || customer.tier === filter)),
    [customers, activeBranch.id, filter]
  );

  const handleTierChange = (customerId: string, tier: CustomerTier) => {
    dispatch({ type: 'CUSTOMER_UPDATE_TIER', payload: { customerId, tier } });
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-brand-200">{t('customers.title')}</h2>
          <p className="text-sm text-slate-300">{t('customers.subtitle', { branch: activeBranch.name })}</p>
        </div>
        <div className="flex gap-2">
          {(['all', 'vip', 'regular', 'blacklist'] as const).map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => setFilter(tier)}
              className={`rounded px-3 py-2 text-sm ${
                filter === tier ? 'bg-brand-500 text-white' : 'border border-slate-700 text-slate-300 hover:border-brand-400'
              }`}
            >
              {t(`customers.filters.${tier}`)}
            </button>
          ))}
        </div>
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {branchCustomers.map((customer) => (
          <div key={customer.id} className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-semibold text-slate-100">{customer.name}</p>
                <p
                  className="text-sm text-slate-400"
                  title={!canViewSensitiveContact ? t('customers.maskedContact') : undefined}
                >
                  {canViewSensitiveContact ? customer.contact : maskContact(customer.contact)}
                </p>
              </div>
              <span className={`text-sm uppercase tracking-wide ${tierColors[customer.tier]}`}>
                {t(`customers.tiers.${customer.tier}`)}
              </span>
            </div>
            <dl className="mt-4 space-y-1 text-sm text-slate-300">
              <div className="flex justify-between">
                <dt>{t('customers.visits')}</dt>
                <dd>{new Intl.NumberFormat(i18n.resolvedLanguage).format(customer.visitCount)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>{t('customers.lastVisit')}</dt>
                <dd>
                  {new Date(customer.lastVisit).toLocaleDateString(i18n.resolvedLanguage, {
                    month: 'short',
                    day: '2-digit'
                  })}
                </dd>
              </div>
            </dl>
            <div className="mt-4 flex flex-wrap gap-2">
              {(['vip', 'regular', 'blacklist'] as const).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => handleTierChange(customer.id, tier)}
                  className={`rounded px-2 py-1 text-xs ${
                    customer.tier === tier
                      ? 'bg-brand-500 text-white'
                      : 'border border-slate-700 text-slate-300 hover:border-brand-400'
                  }`}
                >
                  {t(`customers.tiers.${tier}`)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomersPage;
