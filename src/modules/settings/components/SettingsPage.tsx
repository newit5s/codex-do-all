import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTenant } from '@auth/TenantContext';

const SettingsPage = () => {
  const { t } = useTranslation();
  const { activeBranch } = useTenant();
  const [autoConfirm, setAutoConfirm] = useState(true);
  const [noShowMinutes, setNoShowMinutes] = useState(15);

  return (
    <div className="max-w-3xl space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-brand-200">{t('settings.title')}</h2>
        <p className="text-sm text-slate-300">{t('settings.subtitle', { branch: activeBranch.name })}</p>
      </header>
      <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-brand-100">{t('settings.automation')}</h3>
        <label className="flex items-center justify-between gap-4 text-sm">
          <span className="text-slate-200">{t('settings.autoConfirm')}</span>
          <input
            type="checkbox"
            checked={autoConfirm}
            onChange={(event) => setAutoConfirm(event.target.checked)}
            className="h-4 w-4"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-200">{t('settings.noShow')}</span>
          <input
            type="number"
            min={5}
            value={noShowMinutes}
            onChange={(event) => setNoShowMinutes(Number(event.target.value))}
            className="w-32 rounded border border-slate-700 bg-slate-900 px-3 py-2"
          />
          <p className="mt-1 text-xs text-slate-400">{t('settings.noShowHint')}</p>
        </label>
        <div className="rounded border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
          <p>{t('settings.summary.autoConfirm', { state: autoConfirm ? t('common.enabled') : t('common.disabled') })}</p>
          <p>{t('settings.summary.noShow', { minutes: noShowMinutes })}</p>
        </div>
      </section>
      <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-brand-100">{t('settings.emailTemplates')}</h3>
        <p className="text-sm text-slate-300">{t('settings.emailHint')}</p>
        <textarea className="h-40 w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm" defaultValue={t('settings.templates.bookingConfirmation')} />
        <textarea className="h-40 w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm" defaultValue={t('settings.templates.noShowWarning')} />
        <button type="button" className="rounded bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-400">
          {t('common.save')}
        </button>
      </section>
    </div>
  );
};

export default SettingsPage;
