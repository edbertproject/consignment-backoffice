import i18n from 'i18next';
import translationEN from './en/translation.json';
import translationID from './id/translation.json';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
    id: {
        translation: translationID
    },
    en: {
        translation: translationEN
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        fallbackLng: "id",
        lng: "id",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
