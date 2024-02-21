import { useFormContext } from 'react-hook-form'

import FormTextInput from '@/components/ui/Form/FormTextInput'
import { UpdateProfileFormParams } from '@/types/register'

function UpdateProfileForm() {
  const {
    control,
    formState: { defaultValues },
  } = useFormContext<UpdateProfileFormParams>()

  return (
    <>
      <FormTextInput
        name="email"
        control={control}
        placeholder="Email"
        defaultValue={defaultValues?.email}
        readOnly
      />
      <FormTextInput
        name="name"
        control={control}
        placeholder="Tên"
        defaultValue={defaultValues?.name}
      />
      <FormTextInput
        name="birthday"
        control={control}
        placeholder="Ngày sinh"
        type="date"
        defaultValue={defaultValues?.birthday}
      />
    </>
  )
}

export default UpdateProfileForm
