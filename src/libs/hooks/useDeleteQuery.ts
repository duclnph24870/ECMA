import { useState } from 'react'

import {
  DeleteHandleMethod,
  LoadingStatus,
  RequestError,
} from '@/types/request'

const useDeleteQuery = (deleteHandler: DeleteHandleMethod) => {
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>('idle')
  const [errors, setErrors] = useState<RequestError | undefined>()

  const deleteOne = async (
    id: string,
  ): Promise<[undefined, RequestError | undefined]> => {
    setLoadingStatus('pending')
    const [responseData, responseErrors] = await deleteHandler(id)

    if (responseErrors) {
      setErrors(responseErrors)
      setLoadingStatus('failed')
    } else {
      setLoadingStatus('succeeded')
    }

    return [responseData, responseErrors]
  }

  return { deleteOne, loadingStatus, errors }
}

export default useDeleteQuery
