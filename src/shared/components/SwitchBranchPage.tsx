import { useAuth } from '@auth/AuthContext';
import { useTenant } from '@auth/TenantContext';
import { branches } from '@store/data';
import { useTranslation } from 'react-i18next';

const SwitchBranchPage = () => {
  const { user, signInAs } = useAuth();
  const { switchBranch } = useTenant();
  const { t } = useTranslation();

  if (!user) {
    return null;
  }

  const handleSwitch = (branchId: string) => {
    signInAs({ ...user, branchId });
    switchBranch(branchId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-200">{t('tenant.switchTitle')}</h2>
        <p className="text-sm text-slate-300">{t('tenant.switchCopy')}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {branches.map((branch) => (
          <button
            key={branch.id}
            type="button"
            onClick={() => handleSwitch(branch.id)}
            className="rounded-lg border border-slate-700 bg-slate-800/60 p-4 text-left hover:border-brand-400 hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold text-brand-100">{branch.name}</h3>
            <p className="text-sm text-slate-300">{branch.openingHours}</p>
            <p className="text-xs uppercase tracking-wide text-slate-400">{branch.timezone}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SwitchBranchPage;
