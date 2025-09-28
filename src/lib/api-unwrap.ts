/**
 * Generic utility to handle different API response formats consistently
 */

export type Paginated<T> = {
  items: T[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export type ApiResponse<T> = {
  success: boolean
  data: T
  message?: string
}

/**
 * Unwraps array or paginated response into consistent format
 * Handles both direct arrays and paginated objects
 */
export function unwrapArrayOrPaginated<T>(data: any): Paginated<T> {
  // If data is already an array, wrap it in pagination structure
  if (Array.isArray(data)) {
    return {
      items: data as T[],
      page: 1,
      pageSize: data.length,
      total: data.length,
      totalPages: 1,
    }
  }
  
  // If data has items property (paginated response)
  if (data && typeof data === 'object' && Array.isArray(data.items)) {
    return {
      items: data.items,
      page: data.page ?? 1,
      pageSize: data.pageSize ?? data.items.length,
      total: data.total ?? data.items.length,
      totalPages: data.totalPages ?? 1,
    }
  }
  
  // Fallback to empty structure
  return {
    items: [],
    page: 1,
    pageSize: 0,
    total: 0,
    totalPages: 1,
  }
}

/**
 * Safely unwraps API response and handles errors
 */
export function unwrapApiResponse<T>(response: any): T {
  // If response has success property (wrapped response)
  if (response && typeof response === 'object' && 'success' in response) {
    if (!response.success) {
      throw new Error(response.message || 'API request failed')
    }
    return response.data
  }
  
  // Return response as-is if not wrapped
  return response
}

/**
 * Combines both unwrapping functions for paginated API responses
 */
export function unwrapPaginatedApiResponse<T>(response: any): Paginated<T> {
  const data = unwrapApiResponse(response)
  return unwrapArrayOrPaginated<T>(data)
}