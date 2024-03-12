import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import dataEN from './locale/En.json'
import dataAR from './locale/Ar.json'
const resources = {
    en: {
        translation: dataEN
    },
    ar: {
        translation: dataAR
    }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    debug: true,
    fallbackLng: 'en',
  });
export default i18n;