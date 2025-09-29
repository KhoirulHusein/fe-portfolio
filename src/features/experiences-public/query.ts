import type { PublicExperiencesParams } from './experiences.types'

/**
 * Maps frontend query parameters to backend API contract
 * Handles sort mapping: 'newest'|'oldest' -> 'desc'|'asc'
 * Validates and bounds page/pageSize parameters
 */
export function mapPublicExperienceQueryToApi(params: PublicExperiencesParams = {}): URLSearchParams {
  const searchParams = new URLSearchParams()
  
  // Handle pagination - ensure valid bounds
  const page = Math.max(1, params.page || 1)
  const pageSize = Math.min(100, Math.max(1, params.pageSize || 20))
  
  searchParams.set('page', page.toString())
  searchParams.set('pageSize', pageSize.toString())
  
  // Handle search query
  if (params.q?.trim()) {
    searchParams.set('q', params.q.trim())
  }
  
  // Handle experience type filter
  if (params.type?.trim()) {
    searchParams.set('type', params.type.trim())
  }
  
  // Handle location filter
  if (params.location?.trim()) {
    searchParams.set('location', params.location.trim())
  }
  
  // Map sort parameter from FE format to BE format
  if (params.sort) {
    const sortMapping: Record<string, string> = {
      'newest': 'desc',
      'oldest': 'asc',
      'desc': 'desc',
      'asc': 'asc'
    }
    
    const mappedSort = sortMapping[params.sort]
    if (mappedSort) {
      // Backend uses 'order' parameter, not 'sort'
      searchParams.set('order', mappedSort)
    }
  }
  
  // Add published filter for public endpoint (if BE requires it)
  // Uncomment if backend needs explicit published=true filter
  // searchParams.set('published', 'true')
  
  return searchParams
}

/**
 * Validates sort parameter values
 */
export function isValidSortValue(sort: unknown): sort is 'newest' | 'oldest' | 'desc' | 'asc' {
  return typeof sort === 'string' && ['newest', 'oldest', 'desc', 'asc'].includes(sort)
}

/**
 * Clamps page number to valid range
 */
export function clampPage(page: unknown): number {
  const numPage = typeof page === 'number' ? page : parseInt(String(page), 10)
  return isNaN(numPage) ? 1 : Math.max(1, numPage)
}

/**
 * Clamps page size to valid range (1-100)
 */
export function clampPageSize(pageSize: unknown): number {
  const numPageSize = typeof pageSize === 'number' ? pageSize : parseInt(String(pageSize), 10)
  return isNaN(numPageSize) ? 20 : Math.min(100, Math.max(1, numPageSize))
}