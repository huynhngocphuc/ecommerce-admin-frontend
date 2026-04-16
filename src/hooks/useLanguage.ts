import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { loadLanguagePreference, saveLanguagePreference } from '../utils/languagePreference';

export const useLanguage = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(loadLanguagePreference());

  // Initialize language from localStorage on first mount and listen for changes
  useEffect(() => {
    const savedLanguage = loadLanguagePreference();
    if (savedLanguage) {
      (i18n).changeLanguage(savedLanguage);
      setLanguage(savedLanguage);
    }

    // Listen for language changes
    const handleLanguageChanged = (lng: string) => {
      setLanguage(lng);
    };
    
    (i18n).on('languageChanged', handleLanguageChanged);
    return () => {
      (i18n).off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  // Change language and persist
  const changeLanguage = (newLanguage: string) => {
    (i18n).changeLanguage(newLanguage);
    saveLanguagePreference(newLanguage);
    setLanguage(newLanguage);
  };

  return {
    language,
    changeLanguage,
    i18n,
    t,
  };
};

export default useLanguage;
