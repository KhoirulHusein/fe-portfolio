import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const EmploymentTypeEnum = z.enum([
  'Full-time',
  'Part-time',
  'Contract',
  'Freelance',
  'Internship'
])

export const experienceCreateSchema = z.object({
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  role: z.string().min(2, 'Role must be at least 2 characters'),
  companyLogoUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional().or(z.literal('')),
  location: z.string().optional().or(z.literal('')),
  employmentType: EmploymentTypeEnum.optional(),
  summary: z.string().optional().or(z.literal('')),
  highlights: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  order: z.number().optional()
}).refine((data) => {
  if (data.endDate && data.startDate) {
    const startDate = new Date(data.startDate)
    const endDate = new Date(data.endDate)
    return endDate >= startDate
  }
  return true
}, {
  message: 'End date must be after or equal to start date',
  path: ['endDate']
})

export const experienceUpdateSchema = experienceCreateSchema.partial().extend({
  id: z.string().min(1, 'ID is required')
})

export const publishExperienceSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  published: z.boolean()
})

export type ExperienceCreateFormData = z.infer<typeof experienceCreateSchema>
export type ExperienceUpdateFormData = z.infer<typeof experienceUpdateSchema>
export type PublishExperienceFormData = z.infer<typeof publishExperienceSchema>

export const experienceCreateResolver = zodResolver(experienceCreateSchema)
export const experienceUpdateResolver = zodResolver(experienceUpdateSchema)
export const publishExperienceResolver = zodResolver(publishExperienceSchema)