import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import LazyLoadingScreen from '@/pages/Loading'

function AuthLayout() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="rounded-lg shadow-lg">
        <Suspense fallback={<LazyLoadingScreen />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}

export default AuthLayout
