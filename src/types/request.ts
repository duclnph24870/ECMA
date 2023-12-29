export interface RequestError {
  status?: number
  message: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: Record<string, any>
  code?: string | number
}
