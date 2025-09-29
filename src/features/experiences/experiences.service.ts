import { http, normalizeResponse, mapApiError } from '@/lib/http'
import { unwrapArrayOrPaginated } from '@/lib/api-unwrap'
import type { 
  Experience, 
  CreateExperienceInput, 
  UpdateExperienceInput, 
  PublishExperienceInput,
  ExperienceSearchParams,
  Paginated,
  ApiResponse
} from './experiences.types'

export async function getAdminExperiences(params?: ExperienceSearchParams): Promise<Paginated<Experience>> {
  try {
    const json = await http
      .get('api/v1/admin/experiences', { 
        searchParams: params as Record<string, string | number | boolean | undefined>
      })
      .json<any>()
    
    const data = normalizeResponse(json)
    return unwrapArrayOrPaginated<Experience>(data)
  } catch (error: any) {
    console.error('[experiences.service] getAdminExperiences error:', error)
    throw mapApiError(error)
  }
}

export async function getExperienceById(id: string): Promise<Experience> {
  try {
    const json = await http
      .get(`api/v1/admin/experiences/${id}`)
      .json<any>()
    
    return normalizeResponse<Experience>(json)
  } catch (error: any) {
    console.error('[experiences.service] getExperienceById error:', error)
    throw mapApiError(error)
  }
}

export async function createExperience(payload: CreateExperienceInput): Promise<Experience> {
  try {
    // Clean up empty strings and ensure arrays are properly formatted
    const cleanedPayload = {
      ...payload,
      companyLogoUrl: payload.companyLogoUrl || null,
      endDate: payload.endDate || null,
      location: payload.location || null,
      employmentType: payload.employmentType || null,
      summary: payload.summary || null,
      highlights: payload.highlights || [],
      techStack: payload.techStack || [],
      order: payload.order || 0
    }

    const json = await http
      .post('api/v1/admin/experiences', {
        json: cleanedPayload
      })
      .json<any>()
    
    const result = normalizeResponse<Experience>(json)
    console.log('[experiences.service] createExperience success:', result)
    return result
  } catch (error: any) {
    console.error('[experiences.service] createExperience error:', error)
    throw mapApiError(error)
  }
}

export async function updateExperience(id: string, payload: Omit<UpdateExperienceInput, 'id'>): Promise<Experience> {
  try {
    // Clean up empty strings and ensure arrays are properly formatted
    const cleanedPayload = {
      ...payload,
      companyLogoUrl: payload.companyLogoUrl === '' ? null : payload.companyLogoUrl,
      endDate: payload.endDate === '' ? null : payload.endDate,
      location: payload.location === '' ? null : payload.location,
      employmentType: payload.employmentType === '' ? null : payload.employmentType,
      summary: payload.summary === '' ? null : payload.summary,
    }

    const json = await http
      .put(`api/v1/admin/experiences/${id}`, {
        json: cleanedPayload
      })
      .json<any>()
    
    const result = normalizeResponse<Experience>(json)
    console.log('[experiences.service] updateExperience success:', result)
    return result
  } catch (error: any) {
    console.error('[experiences.service] updateExperience error:', error)
    throw mapApiError(error)
  }
}

export async function deleteExperience(id: string): Promise<void> {
  try {
    const json = await http
      .delete(`api/v1/admin/experiences/${id}`)
      .json<any>()
    
    normalizeResponse(json)
    console.log('[experiences.service] deleteExperience success:', id)
  } catch (error: any) {
    console.error('[experiences.service] deleteExperience error:', error)
    throw mapApiError(error)
  }
}

export async function publishExperience(id: string, published: boolean): Promise<Experience> {
  try {
    const json = await http
      .patch(`api/v1/admin/experiences/${id}/publish`, {
        json: { published }
      })
      .json<any>()
    
    const result = normalizeResponse<Experience>(json)
    console.log('[experiences.service] publishExperience success:', result)
    return result
  } catch (error: any) {
    console.error('[experiences.service] publishExperience error:', error)
    throw mapApiError(error)
  }
}