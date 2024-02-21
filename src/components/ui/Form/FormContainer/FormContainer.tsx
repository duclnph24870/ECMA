import { ReactNode, useEffect } from 'react'
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
} from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { REQUEST_STATUS } from '@/libs/constants/common'
import { getCurrentLocale } from '@/libs/helpers/locale'
import { toastError } from '@/libs/helpers/toast'
import { cn } from '@/libs/utils/shadcn'
import { LoadingStatus, RequestError } from '@/types/request'

interface FormContainerProps<T extends FieldValues> {
  initValues?: T
  formSubmitText?: string
  formCancelText?: string
  submitClassName?: string
  cancelClassName?: string
  requestErrors?: RequestError
  initLoadingStatus?: LoadingStatus
  requestStatus?: LoadingStatus
  onCancel?: () => void
  onSubmit?: SubmitHandler<T>
  showCancelButton?: boolean
  children?: ReactNode
  isDetail?: boolean
  disabledButtonGroup?: boolean
  wrapperCardClass?: string
  buttonGroupClassName?: string
  disableSubmit?: boolean
  noValidate?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolver?: Resolver<any, unknown>
  formClassName?: string
}

export default function FormContainer<T extends FieldValues>({
  initValues = undefined,
  formSubmitText,
  formCancelText,
  submitClassName,
  cancelClassName,
  requestErrors = undefined,
  requestStatus,
  showCancelButton = false,
  onCancel = undefined,
  onSubmit,
  children,
  disabledButtonGroup = false,
  wrapperCardClass,
  buttonGroupClassName = '',
  disableSubmit,
  noValidate = false,
  initLoadingStatus,
  resolver,
  formClassName,
}: FormContainerProps<T>) {
  const locale = getCurrentLocale()

  const methods = useForm<T>({
    defaultValues: initValues as DefaultValues<T>,
    resolver,
    mode: 'onChange',
  })

  useEffect(() => {
    if (requestErrors?.message) toastError(requestErrors.message)
    if (requestErrors && requestErrors.errors) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.keys(requestErrors.errors).forEach((errorField: any) => {
        methods.setError(errorField, {
          type: 'server_error',
          message: (requestErrors.errors as { [key: string]: string })[
            errorField as string
          ],
        })
      })
    }

    if (requestErrors && requestErrors.message) {
      methods.setError('root.message', {
        type: 'server_error_message',
        message: requestErrors.message,
      })
    }
  }, [requestErrors])

  useEffect(() => {
    methods.reset(initValues)
  }, [initValues])

  useEffect(() => {
    if (Object.keys(methods.formState.errors).length) {
      setTimeout(methods.trigger, 0)
    }
  }, [locale])

  return (
    <FormProvider {...methods}>
      <div className={cn('p-7 md:py-2 w-full', wrapperCardClass)}>
        <form
          className={cn('flex flex-col gap-y-2', formClassName)}
          noValidate={noValidate}
          onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : onSubmit}
        >
          {children}
          {!disabledButtonGroup && (
            <div className={cn('flex justify-center', buttonGroupClassName)}>
              <Button
                type="submit"
                className={cn(submitClassName)}
                disabled={
                  requestStatus === REQUEST_STATUS.PENDING ||
                  initLoadingStatus === REQUEST_STATUS.PENDING ||
                  disableSubmit
                }
              >
                {formSubmitText}
              </Button>

              {showCancelButton && (
                <Button
                  className={cn(cancelClassName)}
                  disabled={requestStatus === REQUEST_STATUS.PENDING}
                  onClick={onCancel}
                >
                  {formCancelText}
                </Button>
              )}
            </div>
          )}
        </form>
      </div>
    </FormProvider>
  )
}
