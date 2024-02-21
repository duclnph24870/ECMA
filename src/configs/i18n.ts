import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import enLocales from '@/../locales/en'
import jaLocales from '@/../locales/ja'
import { LOCALE } from '@/libs/constants/local'

i18next.use(initReactI18next).init({
  lng: localStorage.getItem(LOCALE) || 'ja',
  debug: true,
  resources: {
    en: enLocales,
    ja: jaLocales,
  },
})
