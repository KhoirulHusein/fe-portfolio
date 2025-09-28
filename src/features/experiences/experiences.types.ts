export type Experience = {
  id: string
  company: string
  role: string
  companyLogoUrl?: string | null
  startDate: string
  endDate?: string | null
  location?: string | null
  employmentType?: string | null
  summary?: string | null
  highlights?: string[]
  techStack?: string[]
  order: number
  published: boolean
  createdAt: string
  updatedAt: string
}

export type CreateExperienceInput = Omit<Experience, 'id' | 'createdAt' | 'updatedAt' | 'order'> & {
  order?: number
}

export type UpdateExperienceInput = Partial<CreateExperienceInput> & {
  id: string
}

export type PublishExperienceInput = {
  id: string
  published: boolean
}

export type ExperienceSearchParams = {
  page?: number
  q?: string
  pageSize?: number
}

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

export type ExperiencePaginatedResponse = ApiResponse<Paginated<Experience>>
export type ExperienceResponse = ApiResponse<Experience>
export type ExperiencesResponse = ApiResponse<Experience[]>