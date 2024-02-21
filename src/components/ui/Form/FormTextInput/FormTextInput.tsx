import { HTMLInputTypeAttribute } from 'react'
import { Control, Controller } from 'react-hook-form'

import ErrorMessage from '@/components/ui/ErrorMessage'
import { Input, InputProps } from '@/components/ui/input'
import { cn } from '@/libs/utils/shadcn'

type FormTextInputProps = Omit<InputProps, 'isExistValue' | 'styleInput'> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>
  name: string
  type?: HTMLInputTypeAttribute
  inputContainerClassName?: string
  inputClassName?: string
}

export default function FormTextInput({
  control,
  name,
  type = 'text',
  inputContainerClassName,
  inputClassName,
  className,
  ...otherProps
}: FormTextInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <div className={cn('w-full', inputContainerClassName)}>
          <Input
            type={type}
            className={cn(className)}
            onChange={onChange}
            {...otherProps}
          />
          {error?.message && (
            <ErrorMessage
              className="mt-0.5 text-base"
              message={error.message}
            />
          )}
        </div>
      )}
    />
  )
}
