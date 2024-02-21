import { toast, ToastOptions } from 'react-hot-toast'

export const toastSuccess = (message: string, options?: ToastOptions) => {
  return toast.success(message, {
    ...options,
  })
}

export const toastError = (message: string, options?: ToastOptions) => {
  return toast.error(message, {
    ...options,
  })
}
