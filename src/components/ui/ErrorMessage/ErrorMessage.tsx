import { cn } from '@/libs/utils/shadcn'

interface ErrorMessageProps {
  className?: string
  message?: string
}

export default function ErrorMessage({
  className = '',
  message,
}: ErrorMessageProps) {
  return message ? (
    <p className={cn('text-sm text-red-500', className)}>{message}</p>
  ) : null
}
