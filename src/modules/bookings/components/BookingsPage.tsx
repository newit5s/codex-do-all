import { FormEvent, useMemo, useState } from 'react';
import { useAppDispatch, useAppState, bookingStatuses } from '@store/AppStateContext';
import { useTenant } from '@auth/TenantContext';
import { Booking, BookingStatus } from '@store/types';
import { formatDate, formatNumber } from '@shared/utils/intl';
import { useTranslation } from 'react-i18next';
import { createId } from '@shared/utils/id';

const statusColors: Record<BookingStatus, string> = {
  pending: 'bg-amber-500/10 text-amber-300',
  confirmed: 'bg-emerald-500/10 text-emerald-300',
  cancelled: 'bg-rose-500/10 text-rose-300',
  no_show: 'bg-slate-500/20 text-slate-200'
};

const BookingsPage = () => {
  const { bookings, tables, customers } = useAppState();
  const { activeBranch } = useTenant();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const [formState, setFormState] = useState({
    customerId: '',
    tableIds: [] as string[],
    startAt: '',
    endAt: '',
    partySize: 2,
    notes: ''
  });

  const branchBookings = useMemo(
    () => bookings.filter((booking) => booking.branchId === activeBranch.id),
    [bookings, activeBranch.id]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formState.customerId || !formState.startAt || !formState.endAt) {
      return;
    }

    const payload: Booking = {
      id: createId(),
      branchId: activeBranch.id,
      tableIds: formState.tableIds,
      customerId: formState.customerId,
      startAt: formState.startAt,
      endAt: formState.endAt,
      status: 'pending',
      partySize: formState.partySize,
      notes: formState.notes
    };

    dispatch({ type: 'BOOKING_CREATE', payload });
    setFormState({ customerId: '', tableIds: [], startAt: '', endAt: '', partySize: 2, notes: '' });
  };

  const handleStatusChange = (bookingId: string, status: BookingStatus) => {
    dispatch({ type: 'BOOKING_STATUS_UPDATE', payload: { bookingId, status } });
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <section className="space-y-4 lg:col-span-2">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-brand-200">{t('bookings.title')}</h2>
            <p className="text-sm text-slate-300">
              {t('bookings.summary', { count: formatNumber(branchBookings.length, i18n.resolvedLanguage) })}
            </p>
          </div>
        </header>
        <div className="overflow-hidden rounded-xl border border-slate-800">
          <table className="min-w-full divide-y divide-slate-800 text-sm">
            <thead className="bg-slate-900/70">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-300">{t('bookings.customer')}</th>
                <th className="px-4 py-3 text-left font-medium text-slate-300">{t('bookings.tables')}</th>
                <th className="px-4 py-3 text-left font-medium text-slate-300">{t('bookings.window')}</th>
                <th className="px-4 py-3 text-left font-medium text-slate-300">{t('bookings.status')}</th>
                <th className="px-4 py-3 text-left font-medium text-slate-300">{t('bookings.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/40">
              {branchBookings.map((booking) => {
                const customer = customers.find((item) => item.id === booking.customerId);
                return (
                  <tr key={booking.id} className="hover:bg-slate-800/40">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-100">{customer?.name ?? t('bookings.unknownCustomer')}</div>
                      <div className="text-xs text-slate-400">{customer?.contact}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-200">{booking.tableIds.join(', ') || t('bookings.unassigned')}</td>
                    <td className="px-4 py-3 text-slate-200">
                      <div>{formatDate(booking.startAt, i18n.resolvedLanguage)}</div>
                      <div className="text-xs text-slate-400">
                        {new Date(booking.startAt).toLocaleTimeString(i18n.resolvedLanguage, {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                        {' - '}
                        {new Date(booking.endAt).toLocaleTimeString(i18n.resolvedLanguage, {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusColors[booking.status]}`}>
                        {t(`bookings.statuses.${booking.status}`)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {bookingStatuses.map((status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => handleStatusChange(booking.id, status)}
                            className={`rounded px-2 py-1 text-xs ${
                              booking.status === status
                                ? 'bg-brand-500 text-white'
                                : 'border border-slate-700 text-slate-300 hover:border-brand-400'
                            }`}
                          >
                            {t(`bookings.statuses.${status}`)}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <aside className="space-y-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
          <h3 className="text-lg font-semibold text-brand-100">{t('bookings.createTitle')}</h3>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <label className="block text-sm">
              <span className="mb-1 block text-slate-300">{t('bookings.customer')}</span>
              <select
                value={formState.customerId}
                onChange={(event) => setFormState((prev) => ({ ...prev, customerId: event.target.value }))}
                className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2"
              >
                <option value="">{t('bookings.selectCustomer')}</option>
                {customers
                  .filter((customer) => customer.branchId === activeBranch.id)
                  .map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name} ({customer.tier})
                    </option>
                  ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-slate-300">{t('bookings.tables')}</span>
              <select
                multiple
                value={formState.tableIds}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    tableIds: Array.from(event.target.selectedOptions, (option) => option.value)
                  }))
                }
                className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2"
              >
                {tables
                  .filter((table) => table.branchId === activeBranch.id)
                  .map((table) => (
                    <option key={table.id} value={table.id}>
                      {table.name} · {t(`tables.status.${table.status}`)} · {table.capacity} {t('tables.seats')}
                    </option>
                  ))}
              </select>
            </label>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <label className="block">
                <span className="mb-1 block text-slate-300">{t('bookings.start')}</span>
                <input
                  type="datetime-local"
                  value={formState.startAt}
                  onChange={(event) => setFormState((prev) => ({ ...prev, startAt: event.target.value }))}
                  className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-slate-300">{t('bookings.end')}</span>
                <input
                  type="datetime-local"
                  value={formState.endAt}
                  onChange={(event) => setFormState((prev) => ({ ...prev, endAt: event.target.value }))}
                  className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2"
                />
              </label>
            </div>
            <label className="block text-sm">
              <span className="mb-1 block text-slate-300">{t('bookings.partySize')}</span>
              <input
                type="number"
                min={1}
                value={formState.partySize}
                onChange={(event) => setFormState((prev) => ({ ...prev, partySize: Number(event.target.value) }))}
                className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-slate-300">{t('bookings.notes')}</span>
              <textarea
                value={formState.notes}
                onChange={(event) => setFormState((prev) => ({ ...prev, notes: event.target.value }))}
                className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2"
                rows={3}
              />
            </label>
            <button
              type="submit"
              className="w-full rounded bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-400"
            >
              {t('bookings.createCta')}
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
};

export default BookingsPage;
