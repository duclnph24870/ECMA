import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import App from '@/App'
import { authGuard, signInGuard } from '@/components/guards'
import AuthLayout from '@/components/layouts/AuthLayout'
import MainLayout from '@/components/layouts/MainLayout'
import routerPaths from '@/configs/routes'
import NotFoundPage from '@/pages/NotFound'
import authRouter from '@/routers/auth'
import productRouter from '@/routers/product'

const HomePage = lazy(() => import('@/pages/Home'))

const routers = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <MainLayout />,
        loader: signInGuard,
        children: [
          {
            element: <HomePage />,
            index: true,
            path: routerPaths.HOME,
          },
          ...productRouter,
        ],
      },
      {
        element: <AuthLayout />,
        loader: authGuard,
        children: authRouter,
      },
    ],
  },
  {
    path: routerPaths.NOT_FOUND,
    element: <NotFoundPage />,
  },
])

export default routers
