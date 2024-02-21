import { useFormContext } from 'react-hook-form'

import FormTextInput from '@/components/ui/Form/FormTextInput'
import { LoginParams } from '@/types/login'

function LoginForm() {
  const { control } = useFormContext<LoginParams>()
  return (
    <>
      <FormTextInput name="email" control={control} placeholder="Email" />
      <FormTextInput
        name="password"
        control={control}
        placeholder="Password"
        type="password"
      />
    </>
  )
}

export default LoginForm
