import { Button } from '@/components/ui/button'
import useRouter from '@/libs/hooks/useRouter'

function NotFoundPage() {
  const { navigate } = useRouter()
  if (document) document.title = '404'

  const handleBack = () => {
    navigate(-1)
  }
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="text-[50px] text-black">404</h1>
      <p className="text-black">Page not found</p>
      <Button className="mt-3" onClick={handleBack}>
        Quay lại
      </Button>
    </div>
  )
}

export default NotFoundPage
