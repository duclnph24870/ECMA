import { Link } from 'react-router-dom'

import LoginForm from '@/components/features/LoginForm'
import { Button } from '@/components/ui/button'
import FormContainer from '@/components/ui/Form/FormContainer'
import routerPaths from '@/configs/routes'
import { setAccessToken } from '@/libs/helpers'
import { toastError } from '@/libs/helpers/toast'
import useCreateQuery from '@/libs/hooks/useCreateQuery'
import useRouter from '@/libs/hooks/useRouter'
import yup, { useSchema } from '@/libs/validation'
import authModel from '@/models/auth'
import { LoginParams } from '@/types/login'

function SignIn() {
  const { create: login, loadingStatus } = useCreateQuery(authModel.login)
  const { navigate } = useRouter()

  const schema = useSchema(() =>
    yup.object({
      email: yup
        .string()
        .required('Trường này là trường bắt buộc')
        .email('Chưa đúng định dạng email'),
      password: yup
        .string()
        .required('Trường này là trường bắt buộc')
        .min(5, 'Mật khẩu phải lớn hơn 5 ký tự'),
    }),
  )

  const handleSubmit = async (data: LoginParams) => {
    const [res] = await login(data)

    if (res && res.length === 0)
      return toastError('Thông tin taì khoản không chính xác')
    setAccessToken(String(res?.[0].id))
    return navigate(routerPaths.HOME)
  }

  return (
    <FormContainer
      onSubmit={handleSubmit}
      formSubmitText="Đăng nhập"
      wrapperCardClass="w-[500px]"
      requestStatus={loadingStatus}
      resolver={schema}
    >
      <h1 className="text-[30px] font-bold">Đăng Nhập</h1>
      <LoginForm />
      <Link to={routerPaths.SIGN_UP}>
        <Button type="button" variant="link" className="px-0">
          Bạn chưa có tài khoản?
        </Button>
      </Link>
    </FormContainer>
  )
}

export default SignIn
