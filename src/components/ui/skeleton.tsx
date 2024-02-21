import { cn } from '@/libs/utils/shadcn'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  )
}

// eslint-disable-next-line import/prefer-default-export
export { Skeleton }
