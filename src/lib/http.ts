import ky from 'ky'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'

// Create ky instance with default configuration
export const http = ky.create({
  prefixUrl: API_BASE_URL,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  hooks: {
    beforeRequest: [
      (request) => {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.log('[HTTP]', request.method, String(request.url))
        }
      }
    ],
    afterResponse: [
      (_request, _options, response) => {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.log('[HTTP RES]', response.status, response.url)
        }
      }
    ],
    beforeError: [
      async (error) => {
        const { response } = error
        if (response && response.body) {
          try {
            const errorBody = await response.json() as any
            error.message = errorBody?.message || errorBody?.error?.message || error.message
          } catch {
            // Fallback if response is not JSON
          }
        }
        return error
      }
    ]
  }
})

// Helper function to normalize API responses
export const normalizeResponse = <T>(data: any): T => {
  // Handle different response formats from backend
  if (data?.data) {
    return data.data
  }
  if (data?.success && data?.data) {
    return data.data
  }
  return data
}

// API error types
export interface ApiError {
  message: string
  code?: string
  status?: number
}

export class ApiException extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message)
    this.name = 'ApiException'
  }
}

// Error mapper for consistent error handling
export const mapApiError = (error: any): ApiError => {
  if (error.response) {
    return {
      message: error.message || 'Something went wrong',
      code: error.response.status?.toString(),
      status: error.response.status
    }
  }
  
  return {
    message: error.message || 'Network error',
    code: 'NETWORK_ERROR'
  }
}