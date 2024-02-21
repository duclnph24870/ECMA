import { AxiosRequestConfig } from 'axios'

export interface FilterParams {
  q?: string
  page?: number
  limit?: number
  sort?: string
  order?: OrderType
  [key: string]: string | number | undefined | number[] | string[]
}

export interface RequestError {
  message?: string
  code?: string
  errors?: {
    [key: string]: string
  }
}

export interface ApiResponse<T> {
  status: boolean
  data: T
  message?: string
  errors?: {
    [key: string]: string
  }
}

export interface PaginationData<T> {
  records: T[]
  page: number
  limit: number
  total: number
}

export type GetHandleMethod<TypeResponse, TypeParams> = (
  params?: TypeParams,
  axiosConfig?: AxiosRequestConfig,
) => Promise<[TypeResponse | undefined, RequestError | undefined]>

export type GetOneHandleMethod<TypeResponse> = (
  id?: string,
  params?: FilterParams,
  axiosConfig?: AxiosRequestConfig,
) => Promise<[TypeResponse | undefined, RequestError | undefined]>

export type UpdateHandlerMethod<TypeResponse, TypeParams> = (
  data: TypeParams,
  id?: string,
  axiosConfig?: AxiosRequestConfig,
) => Promise<[TypeResponse | undefined, RequestError | undefined]>

export type CreateHandleMethod<TypeResponse, TypeParams> = (
  data: TypeParams,
) => Promise<[TypeResponse | undefined, RequestError | undefined]>

export type DeleteHandleMethod<TypeResponse = undefined> = (
  id: string,
) => Promise<[TypeResponse, RequestError | undefined]>

export type CreateParams<T> = Omit<T, 'id'>

export type UpdateParams<T> = Partial<Omit<T, 'id'>>

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type OrderType = 'asc' | 'desc'

export type LoadingStatus = 'idle' | 'pending' | 'succeeded' | 'failed'
