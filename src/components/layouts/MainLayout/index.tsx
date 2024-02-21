import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import routerPaths, { routerData } from '@/configs/routes'
import AuthProvider from '@/libs/contexts/AuthContext'
import useRouter from '@/libs/hooks/useRouter'
import LazyLoadingScreen from '@/pages/Loading'

import Sidebar from './Sidebar'

function MainLayout() {
  const { pathname } = useRouter()

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (
    <AuthProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar />
        <main className="w-full px-5">
          <header className="flex h-[60px] w-full items-center border-b">
            <h1 className="text-[40px] font-semibold">
              {pathname.match(/^\/products\/(\d+)$/)
                ? routerData[routerPaths.PRODUCT_UPDATE].pageTitle
                : routerData[pathname]?.pageTitle}
            </h1>
          </header>
          <Suspense fallback={<LazyLoadingScreen />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </AuthProvider>
  )
}

export default MainLayout
