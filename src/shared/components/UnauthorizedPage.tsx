import { useTranslation } from 'react-i18next';

const UnauthorizedPage = () => {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-3xl rounded-lg border border-red-500/30 bg-red-500/5 p-6 text-center">
      <h2 className="text-2xl font-semibold text-red-300">{t('errors.unauthorizedTitle')}</h2>
      <p className="mt-4 text-sm text-red-100">{t('errors.unauthorizedCopy')}</p>
    </div>
  );
};

export default UnauthorizedPage;
