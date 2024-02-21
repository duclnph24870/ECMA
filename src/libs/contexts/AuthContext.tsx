import { createContext, ReactNode, useContext, useEffect, useMemo } from 'react'

import routerPaths from '@/configs/routes'
import { REQUEST_STATUS } from '@/libs/constants/common'
import { handleLogout } from '@/libs/helpers/auth'
import useGetOneQuery from '@/libs/hooks/useGetOneQuery'
import useRouter from '@/libs/hooks/useRouter'
import userModel from '@/models/user'
import { User } from '@/types/user'

interface AuthContextValues {
  user: User | null
  reload: (abortController?: AbortController | undefined) => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextValues | undefined>(undefined)

export const useAuthContext = () => {
  const data = useContext<AuthContextValues | undefined>(AuthContext)
  if (data === undefined)
    throw new Error('useAuthProvider must be used within a AuthProvider tag')
  return data
}

function AuthProvider({ children }: AuthProviderProps) {
  const { data: user, loadingStatus, fetchData } = useGetOneQuery(userModel.me)
  const { navigate } = useRouter()

  useEffect(() => {
    if (loadingStatus === REQUEST_STATUS.FAILED) {
      ;(async () => {
        await handleLogout()
        navigate(routerPaths.SIGN_IN)
      })()
    }
  }, [loadingStatus])

  const values = useMemo<AuthContextValues>(
    () => ({ user: user || null, reload: fetchData }),
    [user],
  )
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default AuthProvider
