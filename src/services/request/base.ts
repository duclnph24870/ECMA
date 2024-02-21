import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from 'axios'

import { REQUEST_ERROR_CODES } from '@/libs/constants/common'
import { LOCALES } from '@/libs/constants/locale'
import { getCurrentToken } from '@/libs/helpers'
import { getCurrentLocale } from '@/libs/helpers/locale'
import {
  ApiResponse,
  FilterParams,
  RequestError,
  RequestMethod,
} from '@/types/request'

const formatPrams = (params: FilterParams = {}) => {
  if (!params) return undefined
  const { page, limit, order, sort, ...otherParams } = params
  return {
    _page: page,
    _limit: limit,
    _order: order,
    _sort: sort,
    ...Object.keys(otherParams)
      .filter(
        (key) =>
          otherParams[key] !== null &&
          otherParams[key] !== undefined &&
          otherParams[key] !== '',
      )
      .reduce((obj: FilterParams, key) => {
        // eslint-disable-next-line no-param-reassign
        obj[key] = otherParams[key]
        return obj
      }, {}),
  }
}

/** instance */
const instance = axios.create({
  timeout: import.meta.env.VITE_TIME_OUT_REQUEST,
  baseURL: import.meta.env.VITE_API_URL,
})

/** Pre request */
instance.interceptors.request.use(
  async (config) => {
    const defaultToken = config.headers?.Authorization
      ? String(config.headers.Authorization)
      : undefined
    const accessToken = defaultToken || getCurrentToken()
    const locale = getCurrentLocale() || LOCALES.JA

    const newConfig: InternalAxiosRequestConfig = {
      ...config,
      headers: {
        ...config.headers,
        Authorization: accessToken?.includes('Bearer')
          ? accessToken
          : `Bearer ${accessToken}`,
        'X-localization': locale,
      } as unknown as AxiosRequestHeaders,
    }
    return newConfig
  },
  async (error) => Promise.reject(error),
)

/** Pre response */
instance.interceptors.response.use(
  async (response) => response,
  async (error) => {
    return Promise.reject(error)
  },
)

/** Base request */
const baseRequest = async (
  url: string,
  method: RequestMethod,
  data: unknown = null,
  configs: AxiosRequestConfig = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<[any | undefined, RequestError | undefined]> => {
  try {
    const response = await instance.request({
      ...configs,
      method,
      params: method === 'GET' && formatPrams(data as FilterParams),
      data: method !== 'GET' && data,
      url,
    })

    return [response.data.data || response.data || response, undefined]
  } catch (error) {
    const err = error as AxiosError
    const requestError: RequestError = {}

    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      const responseData = err.response.data as ApiResponse<unknown>
      requestError.message = responseData.message
      requestError.code = String(err.response.status)
      requestError.errors = responseData.errors
    } else if (err.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      requestError.message = err.message
    } else {
      // Something happened in setting up the request that triggered an Error
      requestError.message = err.message
    }

    if (err.code === REQUEST_ERROR_CODES.ERR_CANCELED) {
      return [
        undefined,
        {
          code: REQUEST_ERROR_CODES.ERR_CANCELED,
        },
      ]
    }

    return [undefined, requestError]
  }
}

export default baseRequest
