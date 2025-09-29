import ky from 'ky'

// Main HTTP client instance
export const http = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000',
  credentials: 'include',
  hooks: {
    beforeRequest: [
      (request) => {
        console.log('[HTTP]', request.method, String(request.url))
      }
    ],
    afterResponse: [
      (_request, _options, response) => {
        console.log('[HTTP]', response.status, response.url)
      }
    ],
  }
})

/**
 * Normalize API responses to consistent format
 * Handles different response shapes from backend
 */
export function normalizeResponse<T>(json: unknown): T {
  // Handle wrapped success response: { success: boolean; data: T }
  if (json && typeof json === 'object' && 'success' in json) {
    const response = json as { success: boolean; data: T; error?: any; message?: string }
    
    if (!response.success) {
      const errorMessage = response.error?.message || response.message || 'API request failed'
      throw new Error(errorMessage)
    }
    
    return response.data
  }
  
  // Handle direct data response
  return json as T
}

/**
 * Map various error types to consistent Error objects
 * Extracts meaningful error messages from HTTP responses
 */
export function mapApiError(error: unknown): Error {
  // Handle ky HTTPError with response
  if (error && typeof error === 'object' && 'response' in error) {
    const httpError = error as any
    
    // Fallback to status-based messages for HTTP errors
    const status = httpError.response?.status
    if (status === 400) return new Error('Bad request - please check query parameters')
    if (status === 401) return new Error('Unauthorized access')
    if (status === 403) return new Error('Access forbidden')
    if (status === 404) return new Error('Resource not found')
    if (status === 500) return new Error('Internal server error')
    
    return new Error(httpError.message || 'Request failed')
  }
  
  // Handle standard Error objects
  if (error instanceof Error) {
    return error
  }
  
  // Handle string errors
  if (typeof error === 'string') {
    return new Error(error)
  }
  
  // Fallback for unknown error types
  return new Error('Unexpected error occurred')
}