export const LOCALES = Object.freeze({
  EN: 'en',
  JA: 'ja',
})

export const LOCALE_OPTIONS = Object.values(LOCALES).map((locale) => ({
  value: locale,
  label: locale,
}))
