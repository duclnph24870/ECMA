import { redirect } from 'react-router-dom'

import routerPaths from '@/configs/routes'
import { getCurrentToken } from '@/libs/helpers'

// eslint-disable-next-line import/prefer-default-export
export async function authGuard() {
  const token = getCurrentToken()
  if (token) return redirect(routerPaths.HOME)
  return null
}

export async function signInGuard() {
  const token = getCurrentToken()
  if (!token) return redirect(routerPaths.SIGN_IN)
  return null
}
