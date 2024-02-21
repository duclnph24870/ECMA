import { useState } from 'react'

import {
  CreateHandleMethod,
  LoadingStatus,
  RequestError,
} from '@/types/request'

const useCreateQuery = <TP, TR>(createHandler: CreateHandleMethod<TR, TP>) => {
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>('idle')
  const [data, setData] = useState<TR | undefined>()
  const [errors, setErrors] = useState<RequestError | undefined>()

  const create = async (
    params: TP,
  ): Promise<[TR | undefined, RequestError | undefined]> => {
    setLoadingStatus('pending')
    const [responseData, responseErrors] = await createHandler(params)

    if (responseErrors) {
      setErrors(responseErrors)
      setLoadingStatus('failed')
    } else {
      setData(responseData)
      setLoadingStatus('succeeded')
    }

    return [responseData, responseErrors]
  }

  return { create, loadingStatus, data, errors }
}

export default useCreateQuery
