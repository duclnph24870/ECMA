import { useEffect, useState } from 'react'

import { REQUEST_ERROR_CODES } from '@/libs/constants/common'
import {
  FilterParams,
  GetOneHandleMethod,
  LoadingStatus,
  RequestError,
} from '@/types/request'

const useGetOneQuery = <TR>(
  getOneHandler: GetOneHandleMethod<TR>,
  id?: string,
  params?: FilterParams,
) => {
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>('idle')
  const [data, setData] = useState<TR | undefined>()
  const [errors, setErrors] = useState<RequestError | undefined>()

  const fetchData = async (abortController?: AbortController) => {
    setLoadingStatus('pending')
    const [responseData, responseErrors] = await getOneHandler(id, params, {
      signal: abortController?.signal,
    })

    if (
      responseErrors &&
      responseErrors?.code !== REQUEST_ERROR_CODES.ERR_CANCELED
    ) {
      setErrors(responseErrors)
      setLoadingStatus('failed')
    }

    if (responseData) {
      setData(responseData)
      setLoadingStatus('succeeded')
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    fetchData(abortController)

    return () => {
      abortController.abort()
    }
  }, [])

  return { loadingStatus, data, errors, fetchData }
}

export default useGetOneQuery
