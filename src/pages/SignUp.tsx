import { Link } from 'react-router-dom'

import RegisterForm from '@/components/features/RegisterForm'
import { Button } from '@/components/ui/button'
import FormContainer from '@/components/ui/Form/FormContainer'
import routerPaths from '@/configs/routes'
import { toastError, toastSuccess } from '@/libs/helpers/toast'
import useCreateQuery from '@/libs/hooks/useCreateQuery'
import useRouter from '@/libs/hooks/useRouter'
import yup, { useSchema } from '@/libs/validation'
import authModel from '@/models/auth'
import { RegisterFormParams } from '@/types/register'

function SignUp() {
  const { create: register, loadingStatus } = useCreateQuery(authModel.register)
  const { navigate } = useRouter()

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
      password: yup
        .string()
        .required('Trường này là trường bắt buộc')
        .min(5, 'Mật khẩu phải lớn hơn 5 ký tự'),
      confirm_password: yup
        .string()
        .required('Trường này là trường bắt buộc')
        .min(5, 'Mật khẩu phải lớn hơn 5 ký tự')
        .oneOf([yup.ref('password')], 'Nhập lại mật khẩu chưa chính xác'),
    }),
  )

  const handleSubmit = async (data: RegisterFormParams) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { confirm_password, ...params } = data
    const [res, errEmail] = await authModel.checkEmailExist(data.email)
    if (errEmail) return toastError('Đã xảy ra lỗi, vui lòng thử lại')
    if (res && res.length > 0) return toastError('Địa chỉ email đã tồn tại')

    const [, err] = await register(params)

    if (err) return toastError('Đã xảy ra lỗi, vui lòng thử lại')

    toastSuccess('Đăng ký tài khoản thành công')
    return navigate(routerPaths.SIGN_IN)
  }

  return (
    <FormContainer
      onSubmit={handleSubmit}
      formSubmitText="Đăng nhập"
      wrapperCardClass="w-[500px]"
      requestStatus={loadingStatus}
      resolver={schema}
    >
      <h1 className="text-[30px] font-bold">Đăng Ký</h1>
      <RegisterForm />
      <Link to={routerPaths.SIGN_IN}>
        <Button variant="link" className="px-0">
          Đi đến trang đăng nhập
        </Button>
      </Link>
    </FormContainer>
  )
}

export default SignUp
