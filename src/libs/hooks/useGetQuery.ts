import { useEffect, useState } from 'react'

import { REQUEST_ERROR_CODES } from '@/libs/constants/common'
import { GetHandleMethod, LoadingStatus, RequestError } from '@/types/request'

const useGetQuery = <TP, TR>(
  getHandler: GetHandleMethod<TR, TP>,
  params?: TP,
) => {
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>('idle')
  const [data, setData] = useState<TR | undefined>()
  const [errors, setErrors] = useState<RequestError | undefined>()

  const fetchData = async (abortController?: AbortController) => {
    setLoadingStatus('pending')
    const [responseData, responseErrors] = await getHandler(params, {
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
  }, [params])

  return { loadingStatus, data, errors, fetchData }
}

export default useGetQuery
