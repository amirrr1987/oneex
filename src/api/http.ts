import axios, { AxiosHeaders, type AxiosError, type InternalAxiosRequestConfig } from 'axios'

import { ApiError, type ApiResponse } from '@api/client'
import { resolveMockRequest } from '@api/mock/router'

const DEFAULT_DELAY_MS = 350

export const http = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

http.defaults.adapter = async (config) => {
  const delayMs = Number(config.headers?.['x-delay-ms'] ?? DEFAULT_DELAY_MS)
  await new Promise((resolve) => setTimeout(resolve, delayMs))

  try {
    const payload = await resolveMockRequest(config)
    const body: ApiResponse<unknown> = {
      data: payload,
      timestamp: new Date().toISOString(),
    }

    return {
      data: body,
      status: 200,
      statusText: 'OK',
      headers: { 'content-type': 'application/json' },
      config,
    }
  } catch (error) {
    if (error instanceof ApiError) {
      const axiosError: AxiosError = {
        name: 'AxiosError',
        message: error.message,
        config,
        isAxiosError: true,
        toJSON: () => ({}),
        response: {
          data: { message: error.message },
          status: error.status,
          statusText: error.message,
          headers: {},
          config,
        },
      }
      throw axiosError
    }

    throw error
  }
}

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message = error.response?.data?.message ?? error.message ?? 'Request failed'
    const status = error.response?.status ?? 500
    throw new ApiError(message, status)
  },
)

export async function apiGet<T>(url: string, config?: InternalAxiosRequestConfig) {
  const { data } = await http.get<ApiResponse<T>>(url, config)
  return data
}

export async function apiPost<T>(
  url: string,
  body?: unknown,
  config?: InternalAxiosRequestConfig,
) {
  const { data } = await http.post<ApiResponse<T>>(url, body, config)
  return data
}

export async function apiPatch<T>(
  url: string,
  body?: unknown,
  config?: InternalAxiosRequestConfig,
) {
  const { data } = await http.patch<ApiResponse<T>>(url, body, config)
  return data
}

export function withDelay(delayMs: number): InternalAxiosRequestConfig {
  const headers = new AxiosHeaders()
  headers.set('x-delay-ms', delayMs)
  return { headers }
}
