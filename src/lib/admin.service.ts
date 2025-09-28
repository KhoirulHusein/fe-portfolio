import { http, normalizeResponse, mapApiError } from '@/lib/http'
import { ADMIN } from '@/lib/endpoint'

// Types for dashboard data
export interface DashboardStats {
  totalProjects: number
  totalExperiences: number
  lastUpdated: string
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  createdAt: string
  updatedAt: string
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate?: string
  description: string
  createdAt: string
  updatedAt: string
}

export const adminService = {
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = await http.get(ADMIN.DASHBOARD_STATS).json()
      return normalizeResponse<DashboardStats>(response)
    } catch (error: any) {
      const apiError = mapApiError(error)
      throw new Error(apiError.message)
    }
  },

  async getProjects(): Promise<Project[]> {
    try {
      const response = await http.get(ADMIN.PROJECTS).json()
      return normalizeResponse<Project[]>(response)
    } catch (error: any) {
      const apiError = mapApiError(error)
      throw new Error(apiError.message)
    }
  },

  async getExperiences(): Promise<Experience[]> {
    try {
      const response = await http.get(ADMIN.EXPERIENCES).json()
      const normalized = normalizeResponse<Experience[] | { items: Experience[] }>(response)
      
      // Handle both direct array and paginated response
      if (Array.isArray(normalized)) {
        return normalized
      }
      if (normalized && typeof normalized === 'object' && 'items' in normalized && Array.isArray(normalized.items)) {
        return normalized.items
      }
      return []
    } catch (error: any) {
      const apiError = mapApiError(error)
      throw new Error(apiError.message)
    }
  },

  async getAbout(): Promise<any> {
    try {
      const response = await http.get(ADMIN.ABOUT).json()
      return normalizeResponse(response)
    } catch (error: any) {
      const apiError = mapApiError(error)
      throw new Error(apiError.message)
    }
  },
}