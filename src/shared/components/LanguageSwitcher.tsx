import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'ja', label: '日本語' }
];

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = async (code: string) => {
    await i18n.changeLanguage(code);
  };

  const currentLanguage = languages.find((lang) => lang.code === i18n.resolvedLanguage) ?? languages[0];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center gap-2 rounded border border-slate-700 px-3 py-2 text-sm hover:border-brand-400">
        <GlobeAltIcon className="h-4 w-4" />
        <span>{t('i18n.language')}</span>
        <span className="text-xs text-slate-400">{currentLanguage.label}</span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-44 origin-top-right divide-y divide-slate-800 rounded-md bg-slate-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {languages.map((language) => (
            <Menu.Item key={language.code}>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => handleLanguageChange(language.code)}
                  className={`${active ? 'bg-brand-500 text-white' : 'text-slate-200'} group flex w-full items-center px-4 py-2 text-sm`}
                >
                  {language.label}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
