import '@/configs/i18n'

import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'

import { routerData } from '@/configs/routes'
import useRouter from '@/libs/hooks/useRouter'

function App() {
  const { pathname } = useRouter()

  if (document && routerData[pathname]?.documenTitle)
    document.title = routerData[pathname]?.documenTitle

  return (
    <>
      <Outlet />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className:
            '!rounded-full !py-2 !px-4 [&_div]:!my-0 !h-9 !select-none',
          duration: 3000,
        }}
      />
    </>
  )
}

export default App
