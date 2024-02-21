import { LOCALE } from '@/libs/constants/local'

// eslint-disable-next-line import/prefer-default-export
export const getCurrentLocale = (): string | null => {
  return localStorage.getItem(LOCALE) || null
}
