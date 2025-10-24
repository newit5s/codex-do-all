import { useMemo } from 'react';
import { useAppState } from '@store/AppStateContext';
import { useTenant } from '@auth/TenantContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { formatCurrency, formatDate, formatNumber } from '@shared/utils/intl';
import { useTranslation } from 'react-i18next';
import { StatCard } from '@shared/components/StatCard';

const Dashboard = () => {
  const { analytics, bookings } = useAppState();
  const { activeBranch } = useTenant();
  const { t, i18n } = useTranslation();

  const data = useMemo(() => analytics.filter((item) => item.branchId === activeBranch.id), [analytics, activeBranch.id]);
  const aggregate = useMemo(() => {
    const branchBookings = bookings.filter((booking) => booking.branchId === activeBranch.id);
    const revenue = data.reduce((total, item) => total + item.revenue, 0);
    const cancellations = data.reduce((total, item) => total + item.cancellations, 0);
    return {
      bookings: branchBookings.length,
      revenue,
      cancellations
    };
  }, [bookings, data, activeBranch.id]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-brand-200">{t('analytics.title')}</h2>
        <p className="text-sm text-slate-300">{t('analytics.subtitle', { branch: activeBranch.name })}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title={t('bookings.title')}
          value={formatNumber(aggregate.bookings, i18n.resolvedLanguage)}
          description={t('bookings.summary', { count: aggregate.bookings })}
        />
        <StatCard
          title={t('analytics.revenueTrend')}
          value={formatCurrency(aggregate.revenue, i18n.resolvedLanguage)}
          description={t('analytics.subtitle', { branch: activeBranch.name })}
        />
        <StatCard
          title={t('bookings.statuses.cancelled')}
          value={formatNumber(aggregate.cancellations, i18n.resolvedLanguage)}
          description={t('bookings.statuses.cancelled')}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold text-brand-100">{t('analytics.revenueTrend')}</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="date"
                stroke="#94a3b8"
                tickFormatter={(value) => formatDate(value, i18n.resolvedLanguage)}
              />
              <YAxis stroke="#94a3b8" tickFormatter={(value) => formatCurrency(value, i18n.resolvedLanguage)} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.75rem' }}
                formatter={(value: number) => formatCurrency(value, i18n.resolvedLanguage)}
                labelFormatter={(value) => formatDate(value, i18n.resolvedLanguage)}
              />
              <Area type="monotone" dataKey="revenue" stroke="#38bdf8" fillOpacity={1} fill="url(#revenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold text-brand-100">{t('analytics.bookingMix')}</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#94a3b8" tickFormatter={(value) => formatDate(value, i18n.resolvedLanguage)} />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.75rem' }}
                labelFormatter={(value) => formatDate(value, i18n.resolvedLanguage)}
              />
              <Bar dataKey="bookings" stackId="a" fill="#3b82f6" />
              <Bar dataKey="cancellations" stackId="a" fill="#f97316" />
              <Bar dataKey="noShows" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
