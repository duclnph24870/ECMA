import { useEffect, useMemo, useState } from 'react'
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'

function useRouter() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, changeQuery] = useState<Partial<Record<string, string>>>({})
  const params = useParams()

  useEffect(() => {
    const queryRaw = searchParams
      .toString()
      .split('&')
      .filter((item) => item !== '&')
      .map((item) => {
        const [key, value] = item.split('=')
        return {
          [key]: decodeURIComponent(value),
        }
      })
    let queryFormat = {}
    queryRaw.forEach((item) => {
      queryFormat = { ...queryFormat, ...item }
    })
    changeQuery(queryFormat)
  }, [searchParams])

  const router = useMemo(
    () => ({
      navigate,
      query,
      setSearchParams,
      pathname,
      params,
    }),
    [query, navigate, pathname, params],
  )

  return router
}

export default useRouter
