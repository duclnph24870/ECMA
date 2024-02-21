import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import FormTextInput from '@/components/ui/Form/FormTextInput'
import { RegisterFormParams } from '@/types/register'

function RegisterForm() {
  const { control, watch, trigger } = useFormContext<RegisterFormParams>()
  const passwordValue = watch('password')

  useEffect(() => {
    if (passwordValue) trigger('confirm_password')
  }, [passwordValue])
  return (
    <>
      <FormTextInput name="email" control={control} placeholder="Email" />
      <FormTextInput name="name" control={control} placeholder="Tên" />
      <FormTextInput
        name="birthday"
        control={control}
        placeholder="Ngày sinh"
        type="date"
      />
      <FormTextInput
        name="password"
        control={control}
        placeholder="Mật khẩu"
        type="password"
      />
      <FormTextInput
        name="confirm_password"
        control={control}
        placeholder="Nhập lại mật khẩu"
        type="password"
      />
    </>
  )
}

export default RegisterForm
