import { useMemo, useState } from 'react';
import { useAppDispatch, useAppState, tableStatuses } from '@store/AppStateContext';
import { Table, TableStatus } from '@store/types';
import { useTenant } from '@auth/TenantContext';
import { useTranslation } from 'react-i18next';

const statusStyles: Record<TableStatus, string> = {
  available: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200',
  occupied: 'bg-rose-500/10 border-rose-500/40 text-rose-200',
  reserved: 'bg-amber-500/10 border-amber-500/40 text-amber-200',
  unavailable: 'bg-slate-500/10 border-slate-500/40 text-slate-300'
};

const TablesPage = () => {
  const { tables, bookings } = useAppState();
  const { activeBranch } = useTenant();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const branchTables = useMemo(
    () => tables.filter((table) => table.branchId === activeBranch.id),
    [tables, activeBranch.id]
  );

  const handleStatusChange = (tableId: string, status: TableStatus) => {
    dispatch({ type: 'TABLE_STATUS_UPDATE', payload: { tableId, status } });
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-brand-200">{t('tables.title')}</h2>
        <p className="text-sm text-slate-300">{t('tables.subtitle', { branch: activeBranch.name })}</p>
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {branchTables.map((table) => (
          <button
            key={table.id}
            type="button"
            onClick={() => setSelectedTable(table)}
            className={`rounded-xl border px-4 py-6 text-left transition hover:scale-[1.01] ${statusStyles[table.status]}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">{table.name}</span>
              <span className="text-sm uppercase tracking-wide">{t(`tables.status.${table.status}`)}</span>
            </div>
            <p className="mt-2 text-sm text-slate-300">{t('tables.capacity', { capacity: table.capacity })}</p>
            <p className="text-xs text-slate-400">
              {t('tables.assignments', {
                count: bookings.filter((booking) => booking.tableIds.includes(table.id)).length
              })}
            </p>
          </button>
        ))}
      </div>
      {selectedTable ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-brand-100">{selectedTable.name}</h3>
              <p className="text-sm text-slate-300">{t('tables.capacity', { capacity: selectedTable.capacity })}</p>
            </div>
            <button
              type="button"
              className="rounded bg-slate-800 px-3 py-1 text-sm text-slate-200 hover:bg-slate-700"
              onClick={() => setSelectedTable(null)}
            >
              {t('common.close')}
            </button>
          </div>
          <div className="mt-4 space-y-3">
            <p className="text-sm text-slate-300">{t('tables.changeStatus')}</p>
            <div className="flex flex-wrap gap-2">
              {tableStatuses.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => handleStatusChange(selectedTable.id, status)}
                  className={`rounded px-3 py-2 text-sm ${
                    selectedTable.status === status
                      ? 'bg-brand-500 text-white'
                      : 'border border-slate-700 text-slate-300 hover:border-brand-400'
                  }`}
                >
                  {t(`tables.status.${status}`)}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TablesPage;
