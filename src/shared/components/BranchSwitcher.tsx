import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useTenant } from '@auth/TenantContext';
import { branches } from '@store/data';
import { useAuth } from '@auth/AuthContext';
import { useTranslation } from 'react-i18next';

export const BranchSwitcher = () => {
  const { activeBranch, switchBranch } = useTenant();
  const { user } = useAuth();
  const { t } = useTranslation();

  const canSwitch = user?.role === 'super_admin';

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className={`rounded border px-3 py-2 text-sm ${
          canSwitch ? 'border-brand-500 text-brand-200 hover:border-brand-300' : 'border-slate-700 text-slate-300'
        }`}
        disabled={!canSwitch}
      >
        <div className="flex flex-col items-start">
          <span className="text-xs uppercase tracking-wide text-slate-400">{t('tenant.branch')}</span>
          <span className="font-semibold">{activeBranch.name}</span>
        </div>
      </Menu.Button>
      {canSwitch ? (
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-slate-800 rounded-md bg-slate-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {branches.map((branch) => (
              <Menu.Item key={branch.id}>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => switchBranch(branch.id)}
                    className={`${active ? 'bg-brand-500 text-white' : 'text-slate-200'} block w-full px-4 py-2 text-left text-sm`}
                  >
                    <span className="font-semibold">{branch.name}</span>
                    <span className="block text-xs text-slate-400">{branch.openingHours}</span>
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      ) : null}
    </Menu>
  );
};
