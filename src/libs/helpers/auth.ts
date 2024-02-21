import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/libs/constants/local'
import { removeCookie } from '@/libs/helpers/cookie'

// eslint-disable-next-line import/prefer-default-export
export const handleLogout = async () => {
  removeCookie(ACCESS_TOKEN)
  removeCookie(REFRESH_TOKEN)
}
