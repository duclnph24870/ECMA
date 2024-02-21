import { AxiosRequestConfig } from 'axios'

import client from '@/services/request/client'
import {
  CreateParams,
  FilterParams,
  PaginationData,
  RequestError,
  UpdateParams,
} from '@/types/request'

export default abstract class Model<T, F = unknown> {
  protected abstract url: string

  create = (
    data: CreateParams<T>,
  ): Promise<[T | undefined, RequestError | undefined]> => {
    return client.post(this.url, data)
  }

  createForm = (
    data: CreateParams<T>,
  ): Promise<[T | undefined, RequestError | undefined]> => {
    return client.post(this.url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  getOne = (
    id?: string,
    params?: FilterParams,
    configAxios?: AxiosRequestConfig,
  ): Promise<[T | undefined, RequestError | undefined]> => {
    return client.get(`${this.url}${id ? `/${id}` : ''}`, params, configAxios)
  }

  getAll = (
    params?: F,
    configAxios?: AxiosRequestConfig,
  ): Promise<[PaginationData<T> | undefined, RequestError | undefined]> => {
    return client.get(this.url, params, configAxios)
  }

  getAllNoPaginate = (
    params?: F,
    configAxios?: AxiosRequestConfig,
  ): Promise<[T[] | undefined, RequestError | undefined]> => {
    return client.get(`${this.url}`, params, configAxios)
  }

  update = (
    data: UpdateParams<T>,
    id?: string,
  ): Promise<[T | undefined, RequestError | undefined]> => {
    return client.put(`${this.url}${id ? `/${id}` : ''}`, data)
  }

  updateForm = (
    data: UpdateParams<T>,
    id?: string,
  ): Promise<[T | undefined, RequestError | undefined]> => {
    return client.post(`${this.url}${id ? `/${id}` : ''}?_method=PUT`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  delete = (id: string): Promise<[undefined, RequestError | undefined]> => {
    return client.delete(`${this.url}/${id}`)
  }
}
