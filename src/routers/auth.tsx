import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

import routerPaths from '@/configs/routes'

const SignInPage = lazy(() => import('@/pages/SignIn'))
const SignUpPage = lazy(() => import('@/pages/SignUp'))

const authRouter: RouteObject[] = [
  {
    path: routerPaths.SIGN_IN,
    element: <SignInPage />,
  },
  {
    path: routerPaths.SIGN_UP,
    element: <SignUpPage />,
  },
]

export default authRouter
