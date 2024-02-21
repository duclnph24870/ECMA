import { useEffect } from 'react'

import ProductUpdateForm from '@/components/features/ProductUpdateForm'
import FormContainer from '@/components/ui/Form/FormContainer'
import routerPaths, { routerData } from '@/configs/routes'
import { REQUEST_STATUS } from '@/libs/constants/common'
import { toastError, toastSuccess } from '@/libs/helpers/toast'
import useGetOneQuery from '@/libs/hooks/useGetOneQuery'
import useRouter from '@/libs/hooks/useRouter'
import useUpdateQuery from '@/libs/hooks/useUpdateQuery'
import yup, { useSchema } from '@/libs/validation'
import productModel from '@/models/product'
import { Product, ProductUpdateFormParam } from '@/types/product'
import { CreateParams } from '@/types/request'

function ProductUpdate() {
  document.title = routerData[routerPaths.PRODUCT_UPDATE].documenTitle
  const { update, loadingStatus } = useUpdateQuery(productModel.update)
  const {
    navigate,
    params: { id },
  } = useRouter()
  const { data: product, loadingStatus: getStatusLoading } = useGetOneQuery(
    productModel.getOne,
    id as string,
  )

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

  const handleSubmit = async (data: ProductUpdateFormParam) => {
    const [res] = await update(data as unknown as CreateParams<Product>, id)

    if (!res) return toastError('Đã xảy ra lỗi, vui lòng thử lại')

    toastSuccess('Cập nhập sản phẩm thành công')
    return navigate(routerPaths.PRODUCTS)
  }

  useEffect(() => {
    if (getStatusLoading === REQUEST_STATUS.FAILED) {
      toastError('Sản phẩm không tồn tại hoặc đã bị xóa')
      navigate(routerPaths.PRODUCTS)
    }
  }, [])

  return (
    <div className="flex h-full w-full justify-center">
      <FormContainer
        wrapperCardClass="max-w-[700px]"
        onSubmit={handleSubmit}
        formSubmitText="Cập nhập"
        resolver={schema}
        requestStatus={loadingStatus}
        initLoadingStatus={getStatusLoading}
        initValues={product}
      >
        <ProductUpdateForm />
      </FormContainer>
    </div>
  )
}

export default ProductUpdate
