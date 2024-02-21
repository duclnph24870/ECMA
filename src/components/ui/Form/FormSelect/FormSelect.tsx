import { Control, Controller } from 'react-hook-form'

import ErrorMessage from '@/components/ui/ErrorMessage'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SelectOptions } from '@/types/common'

type FormSelectProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>
  name: string
  options: SelectOptions
  placeholder?: string
}

export default function FormSelect({
  control,
  name,
  options,
  placeholder,
}: FormSelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="w-full">
          <Select onValueChange={onChange} value={value}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
