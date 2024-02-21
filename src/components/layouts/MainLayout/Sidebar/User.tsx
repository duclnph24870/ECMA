import { HiChevronRight, HiUser } from 'react-icons/hi'

import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import routerPaths from '@/configs/routes'
import { useAuthContext } from '@/libs/contexts/AuthContext'
import { handleLogout } from '@/libs/helpers/auth'
import useRouter from '@/libs/hooks/useRouter'

function User() {
  const { navigate } = useRouter()
  const { user } = useAuthContext()

  const onLogout = () => {
    handleLogout()
    navigate(routerPaths.SIGN_IN)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="none" className="flex w-full items-center gap-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border">
            <HiUser fontSize={20} className="relative mt-[-2px]" />
          </div>
          <span className="mr-auto text-[18px]">{user?.name}</span>
          <HiChevronRight fontSize={25} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DialogTrigger asChild className="text-black">
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem className="cursor-pointer" onClick={onLogout}>
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default User
