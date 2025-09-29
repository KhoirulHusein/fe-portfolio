'use client'

import { useQuery } from '@tanstack/react-query'
import { getPublicExperiences } from '../experiences.service'
import type { PublicExperienceFilters } from '../experiences.types'

export function usePublicExperiences(filters: PublicExperienceFilters = {}) {
  return useQuery({
    queryKey: ['public-experiences', filters],
    queryFn: () => getPublicExperiences({ pageSize: 20, ...filters }),
    staleTime: 60_000, // 1 minute
    refetchOnWindowFocus: false,
    retry: 1,
  })
}