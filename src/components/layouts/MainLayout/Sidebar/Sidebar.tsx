import { HiHome, HiViewGrid, HiViewGridAdd } from 'react-icons/hi'
import { Link } from 'react-router-dom'

import ChangeProfile from '@/components/features/ChangeProfile'
import routerPaths from '@/configs/routes'
import useRouter from '@/libs/hooks/useRouter'
import { cn } from '@/libs/utils/shadcn'

import User from './User'

function Sidebar() {
  const { pathname } = useRouter()
  return (
    <div className="flex w-[300px] flex-col bg-[#212529] px-3 shadow-lg">
      <h1 className="py-3 text-[25px] font-semibold text-white">Sidebar</h1>
      <hr />
      <ul className="mt-5 flex-1">
        <li>
          <Link
            to={routerPaths.HOME}
            className={cn(
              pathname === routerPaths.HOME && 'bg-primary',
              'text-white block w-full py-3 px-2 rounded-sm',
            )}
          >
            <div className="flex items-center gap-x-2">
              <HiHome fontSize={20} />
              Trang chủ
            </div>
          </Link>
        </li>

        <li>
          <Link
            to={routerPaths.PRODUCTS}
            className={cn(
              pathname === routerPaths.PRODUCTS && 'bg-primary',
              'text-white block w-full py-3 px-2 rounded-sm',
            )}
          >
            <div className="flex items-center gap-x-2">
              <HiViewGrid fontSize={20} />
              Danh sách sản phẩm
            </div>
          </Link>
        </li>

        <li>
          <Link
            to={routerPaths.PRODUCT_CREATE}
            className={cn(
              pathname === routerPaths.PRODUCT_CREATE && 'bg-primary',
              'text-white block w-full py-3 px-2 rounded-sm',
            )}
          >
            <div className="flex items-center gap-x-2">
              <HiViewGridAdd fontSize={20} />
              Thêm sản phẩm
            </div>
          </Link>
        </li>
      </ul>

      <div className=" h-[60px]">
        <ChangeProfile>
          <User />
        </ChangeProfile>
      </div>
    </div>
  )
}

export default Sidebar
