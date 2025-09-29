import { http, normalizeResponse, mapApiError } from '@/lib/http'
import { PUBLIC } from '@/lib/endpoint'
import { mapPublicExperienceQueryToApi } from './query'
import type { PublicExperiencesParams, ExperienceListData } from './experiences.types'

/**
 * Fetch public experiences with filtering, search, and pagination
 */
export async function getPublicExperiences(params: PublicExperiencesParams = {}): Promise<ExperienceListData> {
  try {
    // Map FE params to BE contract
    const searchParams = mapPublicExperienceQueryToApi(params)
    
    // Build endpoint URL
    const endpoint = `${PUBLIC.EXPERIENCES}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    
    console.log('[experiences.service] Fetching:', endpoint)
    
    // Make API request
    const json = await http.get(endpoint).json<any>()

    // Normalize response
    const resp = normalizeResponse<any>(json)
    
    // Handle both array and paginated response shapes
    const isDirectArray = Array.isArray(resp)
    const items = isDirectArray ? resp : (resp?.items ?? [])
    
    // Ensure we always return consistent pagination metadata
    const meta = isDirectArray ? {
      page: params.page || 1,
      pageSize: resp.length,
      total: resp.length,
      totalPages: 1,
    } : {
      page: resp?.page ?? 1,
      pageSize: resp?.pageSize ?? items.length,
      total: resp?.total ?? items.length,
      totalPages: resp?.totalPages ?? 1,
    }
    
    console.log('[experiences.service] Response processed:', { 
      itemCount: items.length, 
      isDirectArray,
      meta 
    })
    
    return {
      items,
      ...meta
    }
  } catch (error: any) {
    console.error('[experiences.service] Failed to fetch public experiences:', error)
    throw mapApiError(error)
  }
}