import { http } from '@/lib/http'
import { unwrapPaginatedApiResponse, unwrapApiResponse } from '@/lib/api-unwrap'
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
    const response = await http
      .get('api/v1/admin/experiences', { 
        searchParams: params as Record<string, string | number | boolean | undefined>
      })
      .json() as any
    
    return unwrapPaginatedApiResponse<Experience>(response)
  } catch (error: any) {
    console.error('[experiences.service] getAdminExperiences error:', error)
    throw new Error(error.message || 'Failed to fetch experiences')
  }
}

export async function getExperienceById(id: string): Promise<Experience> {
  try {
    const response = await http
      .get(`api/v1/admin/experiences/${id}`)
      .json() as ApiResponse<Experience>
    
    return unwrapApiResponse<Experience>(response)
  } catch (error: any) {
    console.error('[experiences.service] getExperienceById error:', error)
    throw new Error(error.message || 'Failed to fetch experience')
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

    const response = await http
      .post('api/v1/admin/experiences', {
        json: cleanedPayload
      })
      .json() as ApiResponse<Experience>
    
    const result = unwrapApiResponse<Experience>(response)
    console.log('[experiences.service] createExperience success:', result)
    return result
  } catch (error: any) {
    console.error('[experiences.service] createExperience error:', error)
    
    // Try to extract error message from response
    let errorMessage = 'Failed to create experience'
    if (error.response) {
      try {
        const errorResponse = await error.response.json()
        errorMessage = errorResponse.message || errorMessage
      } catch {
        // If can't parse JSON, use default message
      }
    }
    
    throw new Error(errorMessage)
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

    const response = await http
      .put(`api/v1/admin/experiences/${id}`, {
        json: cleanedPayload
      })
      .json() as ApiResponse<Experience>
    
    const result = unwrapApiResponse<Experience>(response)
    console.log('[experiences.service] updateExperience success:', result)
    return result
  } catch (error: any) {
    console.error('[experiences.service] updateExperience error:', error)
    
    // Try to extract error message from response
    let errorMessage = 'Failed to update experience'
    if (error.response) {
      try {
        const errorResponse = await error.response.json()
        errorMessage = errorResponse.message || errorMessage
      } catch {
        // If can't parse JSON, use default message
      }
    }
    
    throw new Error(errorMessage)
  }
}

export async function deleteExperience(id: string): Promise<void> {
  try {
    const response = await http
      .delete(`api/v1/admin/experiences/${id}`)
      .json() as ApiResponse<void>
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete experience')
    }
    
    console.log('[experiences.service] deleteExperience success:', id)
  } catch (error: any) {
    console.error('[experiences.service] deleteExperience error:', error)
    
    // Try to extract error message from response
    let errorMessage = 'Failed to delete experience'
    if (error.response) {
      try {
        const errorResponse = await error.response.json()
        errorMessage = errorResponse.message || errorMessage
      } catch {
        // If can't parse JSON, use default message
      }
    }
    
    throw new Error(errorMessage)
  }
}

export async function publishExperience(id: string, published: boolean): Promise<Experience> {
  try {
    const response = await http
      .patch(`api/v1/admin/experiences/${id}/publish`, {
        json: { published }
      })
      .json() as ApiResponse<Experience>
    
    const result = unwrapApiResponse<Experience>(response)
    console.log('[experiences.service] publishExperience success:', result)
    return result
  } catch (error: any) {
    console.error('[experiences.service] publishExperience error:', error)
    
    // Try to extract error message from response
    let errorMessage = `Failed to ${published ? 'publish' : 'unpublish'} experience`
    if (error.response) {
      try {
        const errorResponse = await error.response.json()
        errorMessage = errorResponse.message || errorMessage
      } catch {
        // If can't parse JSON, use default message
      }
    }
    
    throw new Error(errorMessage)
  }
}