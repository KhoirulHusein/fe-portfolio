'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import * as experiencesService from '../experiences.service'
import type { 
  Experience,
  ExperienceSearchParams, 
  CreateExperienceInput, 
  UpdateExperienceInput,
  Paginated
} from '../experiences.types'

// Query keys
export const experienceKeys = {
  all: ['admin-experiences'] as const,
  lists: () => [...experienceKeys.all, 'list'] as const,
  list: (params: ExperienceSearchParams) => [...experienceKeys.lists(), params] as const,
  details: () => [...experienceKeys.all, 'detail'] as const,
  detail: (id: string) => [...experienceKeys.details(), id] as const,
}

// Queries
export function useExperiences(params: ExperienceSearchParams = {}) {
  return useQuery({
    queryKey: experienceKeys.list(params),
    queryFn: () => experiencesService.getAdminExperiences(params),
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useExperience(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: experienceKeys.detail(id),
    queryFn: () => experiencesService.getExperienceById(id),
    enabled: enabled && !!id,
    refetchOnWindowFocus: false,
    retry: 1,
  })
}

// Mutations
export function useCreateExperience() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateExperienceInput) => experiencesService.createExperience(payload),
    onMutate: async (newExperience) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: experienceKeys.lists() })

      // Snapshot the previous value for rollback
      const previousExperiences = queryClient.getQueriesData({ queryKey: experienceKeys.lists() })

      // Optimistically update to the new value
      queryClient.setQueriesData({ queryKey: experienceKeys.lists() }, (old: any) => {
        if (!old) return old

        // Create optimistic experience with temporary ID
        const optimisticExperience: Experience = {
          id: `temp-${Date.now()}`,
          ...newExperience,
          companyLogoUrl: newExperience.companyLogoUrl || null,
          endDate: newExperience.endDate || null,
          location: newExperience.location || null,
          employmentType: newExperience.employmentType || null,
          summary: newExperience.summary || null,
          highlights: newExperience.highlights || [],
          techStack: newExperience.techStack || [],
          order: newExperience.order || 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        // Add to the beginning of items array (most recent first)
        return {
          ...old,
          items: [optimisticExperience, ...old.items],
          total: old.total + 1
        }
      })

      return { previousExperiences }
    },
    onError: (err, newExperience, context) => {
      // Rollback on error
      if (context?.previousExperiences) {
        context.previousExperiences.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
      toast.error(err.message || 'Failed to create experience')
    },
    onSuccess: (data) => {
      toast.success('Experience created successfully')
      // Invalidate and refetch to get the real data from server
      queryClient.invalidateQueries({ queryKey: experienceKeys.lists() })
    },
  })
}

export function useUpdateExperience() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...payload }: UpdateExperienceInput) => 
      experiencesService.updateExperience(id, payload),
    onMutate: async (updatedExperience) => {
      const { id, ...updateData } = updatedExperience
      
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: experienceKeys.lists() })
      await queryClient.cancelQueries({ queryKey: experienceKeys.detail(id) })

      // Snapshot the previous values
      const previousLists = queryClient.getQueriesData({ queryKey: experienceKeys.lists() })
      const previousDetail = queryClient.getQueryData(experienceKeys.detail(id))

      // Optimistically update lists
      queryClient.setQueriesData({ queryKey: experienceKeys.lists() }, (old: any) => {
        if (!old) return old

        return {
          ...old,
          items: old.items.map((item: Experience) =>
            item.id === id ? { ...item, ...updateData, updatedAt: new Date().toISOString() } : item
          )
        }
      })

      // Optimistically update detail if it exists
      if (previousDetail) {
        queryClient.setQueryData(experienceKeys.detail(id), (old: any) => ({
          ...old,
          ...updateData,
          updatedAt: new Date().toISOString()
        }))
      }

      return { previousLists, previousDetail }
    },
    onError: (err, updatedExperience, context) => {
      const { id } = updatedExperience
      
      // Rollback on error
      if (context?.previousLists) {
        context.previousLists.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
      if (context?.previousDetail) {
        queryClient.setQueryData(experienceKeys.detail(id), context.previousDetail)
      }
      
      toast.error(err.message || 'Failed to update experience')
    },
    onSuccess: (data) => {
      toast.success('Experience updated successfully')
      // Invalidate to ensure we have the latest data
      queryClient.invalidateQueries({ queryKey: experienceKeys.detail(data.id) })
    },
  })
}

export function useDeleteExperience() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => experiencesService.deleteExperience(id),
    onMutate: async (deletedId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: experienceKeys.lists() })

      // Snapshot the previous value
      const previousLists = queryClient.getQueriesData({ queryKey: experienceKeys.lists() })

      // Optimistically remove from lists
      queryClient.setQueriesData({ queryKey: experienceKeys.lists() }, (old: any) => {
        if (!old) return old

        return {
          ...old,
          items: old.items.filter((item: Experience) => item.id !== deletedId),
          total: Math.max(0, old.total - 1)
        }
      })

      // Remove detail query
      queryClient.removeQueries({ queryKey: experienceKeys.detail(deletedId) })

      return { previousLists }
    },
    onError: (err, deletedId, context) => {
      // Rollback on error
      if (context?.previousLists) {
        context.previousLists.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
      
      toast.error(err.message || 'Failed to delete experience')
    },
    onSuccess: () => {
      toast.success('Experience deleted successfully')
    },
  })
}

export function usePublishExperience() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, published }: { id: string; published: boolean }) => 
      experiencesService.publishExperience(id, published),
    onMutate: async ({ id, published }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: experienceKeys.lists() })
      await queryClient.cancelQueries({ queryKey: experienceKeys.detail(id) })

      // Snapshot the previous values
      const previousLists = queryClient.getQueriesData({ queryKey: experienceKeys.lists() })
      const previousDetail = queryClient.getQueryData(experienceKeys.detail(id))

      // Optimistically update lists
      queryClient.setQueriesData({ queryKey: experienceKeys.lists() }, (old: any) => {
        if (!old) return old

        return {
          ...old,
          items: old.items.map((item: Experience) =>
            item.id === id ? { ...item, published, updatedAt: new Date().toISOString() } : item
          )
        }
      })

      // Optimistically update detail if it exists
      if (previousDetail) {
        queryClient.setQueryData(experienceKeys.detail(id), (old: any) => ({
          ...old,
          published,
          updatedAt: new Date().toISOString()
        }))
      }

      return { previousLists, previousDetail }
    },
    onError: (err, { id }, context) => {
      // Rollback on error
      if (context?.previousLists) {
        context.previousLists.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
      if (context?.previousDetail) {
        queryClient.setQueryData(experienceKeys.detail(id), context.previousDetail)
      }
      
      toast.error(err.message || 'Failed to update publish status')
    },
    onSuccess: (data) => {
      const action = data.published ? 'published' : 'unpublished'
      toast.success(`Experience ${action} successfully`)
    },
  })
}