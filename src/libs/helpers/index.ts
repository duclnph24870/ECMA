import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/libs/constants/local'
import { getCookie, setCookie } from '@/libs/helpers/cookie'

// eslint-disable-next-line import/prefer-default-export
export const getCurrentToken = (): string | null => {
  return getCookie(ACCESS_TOKEN) || null
}

export const getRefreshToken = (): string | null => {
  return getCookie(REFRESH_TOKEN) || null
}

export const setAccessToken = (token: string) => {
  setCookie(ACCESS_TOKEN, token)
}

export const setRefreshToken = (token: string) => {
  setCookie(REFRESH_TOKEN, token)
}
