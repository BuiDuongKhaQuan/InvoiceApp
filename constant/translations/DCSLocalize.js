import i18n from 'i18next';
import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

import chi from '../translations/chi';
import en from '../translations/en';
import fr from '../translations/fr';
import jp from '../translations/jp';
import ru from '../translations/ru';
import vi from '../translations/vi';
import ko from '../translations/ko';

const LANGUAGE = {
    chi,
    en,
    fr,
    jp,
    ru,
    vi,
    ko,
};
const LANG_CODES = Object.keys(LANGUAGE);

const LANG_DETECTOR = {
    type: 'languageDetector',
    async: true,
    detect: async (callback) => {
        try {
            const storedLanguage = await AsyncStorage.getItem('user-language');
            if (storedLanguage) {
                callback(storedLanguage);
                return;
            }
        } catch (error) {
            console.error('Error retrieving stored language', error);
        }

        const systemLanguage = Localization.locale.split('-')[0];

        const matchingLang = LANG_CODES.find((lang) => systemLanguage.includes(lang));
        callback(matchingLang || 'en');
    },
    init: () => {},
    cachesUserLanguage: async (language) => {
        try {
            await AsyncStorage.setItem('user-language', language);
        } catch (error) {
            console.error('Error storing language', error);
        }
    },
};

i18n.use(LANG_DETECTOR)
    .use(initReactI18next)
    .init({
        resources: LANGUAGE,
        react: {
            useSuspense: false,
        },
        interpolation: {
            escapeValue: false,
        },
    });
