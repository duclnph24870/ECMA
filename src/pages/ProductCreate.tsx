import ProductCreateForm from '@/components/features/ProductCreateForm'
import FormContainer from '@/components/ui/Form/FormContainer'
import routerPaths from '@/configs/routes'
import { toastError, toastSuccess } from '@/libs/helpers/toast'
import useCreateQuery from '@/libs/hooks/useCreateQuery'
import useRouter from '@/libs/hooks/useRouter'
import yup, { useSchema } from '@/libs/validation'
import productModel from '@/models/product'
import { Product, ProductCreateFormParam } from '@/types/product'
import { CreateParams } from '@/types/request'

function ProductCreate() {
  const { create, loadingStatus } = useCreateQuery(productModel.create)
  const { navigate } = useRouter()

  const schema = useSchema(() =>
    yup.object({
      title: yup
        .string()
        .required('Trường này là trường bắt buộc')
        .max(255, 'Tiêu đề sản phẩm cho phép tối đa 255 ký tự'),
      price: yup
        .number()
        .required('Trường này là trường bắt buộc')
        // eslint-disable-next-line no-restricted-globals
        .transform((value) => (isNaN(value) ? null : value))
        .min(0, 'Giá sản phẩm không được là số âm'),
      avatar_url: yup
        .string()
        .required('Trường này là trường bắt buộc')
        .url('Chưa nhập đúng định dạng url'),
      category_id: yup.string().required('Trường này là trường bắt buộc'),
    }),
  )

  const handleSubmit = async (data: ProductCreateFormParam) => {
    const [res] = await create(data as unknown as CreateParams<Product>)

    if (!res) return toastError('Đã xảy ra lỗi, vui lòng thử lại')

    toastSuccess('Thêm sản phẩm thành công')
    return navigate(routerPaths.PRODUCTS)
  }

  return (
    <div className="flex h-full w-full justify-center">
      <FormContainer
        wrapperCardClass="max-w-[700px]"
        onSubmit={handleSubmit}
        formSubmitText="Tạo sản phẩm"
        resolver={schema}
        requestStatus={loadingStatus}
      >
        <ProductCreateForm />
      </FormContainer>
    </div>
  )
}

export default ProductCreate
