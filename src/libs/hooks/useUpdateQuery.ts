import { useState } from 'react'

import {
  LoadingStatus,
  RequestError,
  UpdateHandlerMethod,
} from '@/types/request'

const useUpdateQuery = <TP, TR>(updateHandler: UpdateHandlerMethod<TR, TP>) => {
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>('idle')
  const [data, setData] = useState<TR | undefined>()
  const [errors, setErrors] = useState<RequestError | undefined>()

  const update = async (
    params: TP,
    id?: string,
  ): Promise<[TR | undefined, RequestError | undefined]> => {
    setLoadingStatus('pending')
    const [responseData, responseErrors] = await updateHandler(params, id)

    if (responseErrors) {
      setErrors(responseErrors)
      setLoadingStatus('failed')
    } else {
      setData(responseData)
      setLoadingStatus('succeeded')
    }

    return [responseData, responseErrors]
  }

  return { update, loadingStatus, data, errors }
}

export default useUpdateQuery
