import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="px-3 py-1.5 text-sm font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm flex items-center gap-2 z-50"
      aria-label="Toggle Language"
    >
      <span className="text-lg">🌐</span>
      <span>{i18n.language === 'en' ? 'عربي' : 'EN'}</span>
    </button>
  );
}
