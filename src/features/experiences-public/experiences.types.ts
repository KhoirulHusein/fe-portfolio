// Reuse the core Experience type from the admin features
import type { Experience } from '../experiences/experiences.types'
export type { Experience }

export interface PublicExperienceFilters {
  page?: number
  q?: string
  type?: string
  sort?: 'newest' | 'oldest'
  location?: string
}

export interface PublicExperiencesParams extends PublicExperienceFilters {
  pageSize?: number
}

export interface ExperienceListData {
  items: Experience[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export type ViewMode = 'grid' | 'timeline'