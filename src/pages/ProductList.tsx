/* eslint-disable react/no-unstable-nested-components */
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import ProductTable from '@/components/features/ProductTable'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import routerPaths from '@/configs/routes'
import { REQUEST_STATUS } from '@/libs/constants/common'
import { toastError, toastSuccess } from '@/libs/helpers/toast'
import useGetQuery from '@/libs/hooks/useGetQuery'
import productModel from '@/models/product'
import { Product } from '@/types/product'

function ProductPage() {
  const { data, loadingStatus, fetchData } = useGetQuery(
    productModel.getAllNoPaginate,
  )
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'id',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              ID
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue('id')}</div>
        ),
      },
      {
        accessorKey: 'title',
        header: 'Tên sản phẩm',
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue('title')}</div>
        ),
      },
      {
        accessorKey: 'avatar_url',
        header: 'Hình ảnh',
        cell: ({ row }) => (
          <div className="flex">
            <img
              src={row.getValue('avatar_url')}
              alt=""
              className="h-20 w-20 rounded-lg"
            />
          </div>
        ),
      },
      {
        accessorKey: 'category_id',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Category
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue('category_id')}</div>
        ),
      },
      {
        accessorKey: 'price',
        header: () => <div className="text-right">Giá sản phẩm</div>,
        cell: ({ row }) => {
          const price = parseFloat(row.getValue('price'))

          // Format the amount as a dollar amount
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(price)

          return <div className="text-right font-medium">{formatted}</div>
        },
      },
      {
        id: 'Hành động',
        enableHiding: false,
        cell: ({ row }) => {
          const product = row.original

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${window.location.href}/${product.id}`,
                    )
                  }
                >
                  Copy link sản phẩm
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to={`${routerPaths.PRODUCTS}/${product.id}`}>
                    Chi tiết sản phẩm
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="!text-red-500"
                  onClick={async () => {
                    // eslint-disable-next-line no-restricted-globals, no-alert
                    const isAgree = confirm('Bạn chắc chắn muốn xóa sản phẩm!')
                    if (isAgree) {
                      const [res] = await productModel.delete(product.id)
                      if (res) {
                        toastSuccess('Xóa sản phẩm thành công')
                        fetchData()
                        return
                      }
                      toastError('Có lỗi xảy ra, vui lòng thử lại sau')
                    }
                  }}
                >
                  Xóa sản phẩm
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    [],
  )
  return (
    <div className="mt-5">
      {loadingStatus === REQUEST_STATUS.PENDING ? (
        <Skeleton className="h-[350px] w-full" />
      ) : (
        <ProductTable data={data || []} columns={columns} />
      )}
    </div>
  )
}

export default ProductPage
