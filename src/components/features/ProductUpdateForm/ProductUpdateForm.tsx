import { useFormContext } from 'react-hook-form'

import FormSelect from '@/components/ui/Form/FormSelect/FormSelect'
import FormTextInput from '@/components/ui/Form/FormTextInput'
import { formatArrayOptions } from '@/libs/helpers/format'
import { ProductUpdateFormParam } from '@/types/product'

const category = [
  {
    id: 1,
    title: 'Category 1',
  },
  {
    id: 2,
    title: 'Category 2',
  },
  {
    id: 3,
    title: 'Category 3',
  },
]

function ProductUpdateForm() {
  const {
    control,
    watch,
    formState: { defaultValues },
  } = useFormContext<ProductUpdateFormParam>()
  const avatarUrl = watch('avatar_url')
  return (
    <>
      <FormTextInput
        name="title"
        control={control}
        placeholder="Tiêu đề sản phẩm"
        defaultValue={defaultValues?.title}
      />
      <FormTextInput
        name="price"
        control={control}
        placeholder="Giá sản phẩm"
        type="number"
        defaultValue={defaultValues?.price}
      />
      <FormTextInput
        name="avatar_url"
        control={control}
        placeholder="Đường dẫn hình ảnh sản phẩm"
        defaultValue={defaultValues?.avatar_url}
      />
      {avatarUrl ? (
        <img
          src={avatarUrl}
          className="h-[100px] w-[200px] border"
          alt="avatar"
        />
      ) : (
        <div className="flex h-[100px] w-[200px] items-center justify-center rounded-lg border bg-slate-50">
          Preview
        </div>
      )}

      <FormSelect
        name="category_id"
        control={control}
        placeholder="Chọn loại sản phẩm"
        options={formatArrayOptions(category)}
      />
    </>
  )
}

export default ProductUpdateForm
