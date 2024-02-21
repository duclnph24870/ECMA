/* eslint-disable jsx-a11y/label-has-associated-control */
import { ReactNode } from 'react'

import UpdateProfileForm from '@/components/features/UpdateProfileForm'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import FormContainer from '@/components/ui/Form/FormContainer'
import { useAuthContext } from '@/libs/contexts/AuthContext'
import { toastError, toastSuccess } from '@/libs/helpers/toast'
import useUpdateQuery from '@/libs/hooks/useUpdateQuery'
import yup, { useSchema } from '@/libs/validation'
import userModel from '@/models/user'
import { UpdateProfileFormParams } from '@/types/register'

function ChangeProfile({ children }: { children: ReactNode }) {
  const { user, reload } = useAuthContext()
  const { update, loadingStatus } = useUpdateQuery(userModel.update)

  const schema = useSchema(() =>
    yup.object({
      email: yup
        .string()
        .required('Trường này là trường bắt buộc')
        .email('Chưa đúng định dạng email'),
      name: yup.string().required('Trường này là trường bắt buộc'),
      birthday: yup
        .string()
        .required('Trường này là trường bắt buộc')
        .transform((v) => {
          return v instanceof Date ? null : v
        })
        .maxDateString(
          new Date(),
          'Không được chọn ngày sinh là ngày trong tương lai',
        ),
    }),
  )

  const handleUpdateProfile = async (data: UpdateProfileFormParams) => {
    if (!user) return undefined
    const [res] = await update(data, user.id.toString())
    if (!res) return toastError('Có lỗi xảy ra, vui lòng thử lại')
    await reload()
    return toastSuccess('Cập nhập profile thành coong')
  }
  return (
    <Dialog>
      {children}
      <DialogContent className="bg-white sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>
            Thay đổi thông tin tài khoản cá nhân
          </DialogDescription>
        </DialogHeader>
        <FormContainer
          onSubmit={handleUpdateProfile}
          wrapperCardClass="pb-0"
          resolver={schema}
          requestStatus={loadingStatus}
          formSubmitText="Lưu thay đổi"
          buttonGroupClassName="justify-end mt-5"
          initValues={user as unknown as UpdateProfileFormParams}
        >
          <UpdateProfileForm />
        </FormContainer>
      </DialogContent>
    </Dialog>
  )
}

export default ChangeProfile
