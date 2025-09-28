'use client'

import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useCreateExperience, useUpdateExperience } from '../../hooks/use-experiences'
import type { Experience } from '../../experiences.types'

interface ExperienceFormProps {
  experience?: Experience
  onSuccess?: () => void
  onCancel?: () => void
}

const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']

export function ExperienceForm({ experience, onSuccess, onCancel }: ExperienceFormProps) {
  const isEditing = !!experience
  const createMutation = useCreateExperience()
  const updateMutation = useUpdateExperience()

  // Form state
  const [formData, setFormData] = useState({
    company: experience?.company || '',
    role: experience?.role || '',
    companyLogoUrl: experience?.companyLogoUrl || '',
    startDate: experience?.startDate ? experience.startDate.split('T')[0] : '',
    endDate: experience?.endDate ? experience.endDate.split('T')[0] : '',
    location: experience?.location || '',
    employmentType: experience?.employmentType || '',
    summary: experience?.summary || '',
    published: experience?.published || false,
  })

  const [highlights, setHighlights] = useState<string[]>(experience?.highlights || [])
  const [techStack, setTechStack] = useState<string[]>(experience?.techStack || [])
  const [newHighlight, setNewHighlight] = useState('')
  const [newTechStack, setNewTechStack] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.company.trim() || formData.company.length < 2) {
      newErrors.company = 'Company name must be at least 2 characters'
    }

    if (!formData.role.trim() || formData.role.length < 2) {
      newErrors.role = 'Role must be at least 2 characters'
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }

    if (formData.endDate && formData.startDate) {
      const startDate = new Date(formData.startDate)
      const endDate = new Date(formData.endDate)
      if (endDate < startDate) {
        newErrors.endDate = 'End date must be after or equal to start date'
      }
    }

    if (formData.companyLogoUrl && !isValidUrl(formData.companyLogoUrl)) {
      newErrors.companyLogoUrl = 'Must be a valid URL'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (string: string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const addHighlight = () => {
    if (newHighlight.trim() && !highlights.includes(newHighlight.trim())) {
      setHighlights([...highlights, newHighlight.trim()])
      setNewHighlight('')
    }
  }

  const removeHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index))
  }

  const addTech = () => {
    if (newTechStack.trim() && !techStack.includes(newTechStack.trim())) {
      setTechStack([...techStack, newTechStack.trim()])
      setNewTechStack('')
    }
  }

  const removeTech = (index: number) => {
    setTechStack(techStack.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      const payload = {
        company: formData.company,
        role: formData.role,
        companyLogoUrl: formData.companyLogoUrl || null,
        startDate: formData.startDate,
        endDate: formData.endDate || null,
        location: formData.location || null,
        employmentType: formData.employmentType || null,
        summary: formData.summary || null,
        highlights,
        techStack,
        published: formData.published,
      }

      if (isEditing && experience) {
        await updateMutation.mutateAsync({ id: experience.id, ...payload })
      } else {
        await createMutation.mutateAsync(payload)
      }
      
      onSuccess?.()
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Company & Role */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company">Company *</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            placeholder="Enter company name"
            className={errors.company ? 'border-red-500' : ''}
          />
          {errors.company && (
            <p className="text-sm text-red-500">{errors.company}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role *</Label>
          <Input
            id="role"
            value={formData.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
            placeholder="Enter job role"
            className={errors.role ? 'border-red-500' : ''}
          />
          {errors.role && (
            <p className="text-sm text-red-500">{errors.role}</p>
          )}
        </div>
      </div>

      {/* Company Logo URL */}
      <div className="space-y-2">
        <Label htmlFor="companyLogoUrl">Company Logo URL</Label>
        <Input
          id="companyLogoUrl"
          type="url"
          value={formData.companyLogoUrl}
          onChange={(e) => handleInputChange('companyLogoUrl', e.target.value)}
          placeholder="https://example.com/logo.png"
          className={errors.companyLogoUrl ? 'border-red-500' : ''}
        />
        {errors.companyLogoUrl && (
          <p className="text-sm text-red-500">{errors.companyLogoUrl}</p>
        )}
      </div>

      {/* Start & End Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date *</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            className={errors.startDate ? 'border-red-500' : ''}
          />
          {errors.startDate && (
            <p className="text-sm text-red-500">{errors.startDate}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            className={errors.endDate ? 'border-red-500' : ''}
          />
          {errors.endDate && (
            <p className="text-sm text-red-500">{errors.endDate}</p>
          )}
        </div>
      </div>

      {/* Location & Employment Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="e.g. Jakarta, Indonesia"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employmentType">Employment Type</Label>
          <Select
            value={formData.employmentType}
            onValueChange={(value) => handleInputChange('employmentType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select employment type" />
            </SelectTrigger>
            <SelectContent>
              {employmentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          value={formData.summary}
          onChange={(e) => handleInputChange('summary', e.target.value)}
          placeholder="Brief description of your role and responsibilities..."
          rows={4}
        />
      </div>

      {/* Highlights */}
      <div className="space-y-3">
        <Label>Highlights</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Add a highlight..."
            value={newHighlight}
            onChange={(e) => setNewHighlight(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addHighlight()
              }
            }}
          />
          <Button type="button" onClick={addHighlight} size="sm" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {highlights.map((highlight, index) => (
            <Badge key={index} variant="secondary" className="text-sm">
              {highlight}
              <button
                type="button"
                onClick={() => removeHighlight(index)}
                className="ml-2 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="space-y-3">
        <Label>Tech Stack</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Add a technology..."
            value={newTechStack}
            onChange={(e) => setNewTechStack(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addTech()
              }
            }}
          />
          <Button type="button" onClick={addTech} size="sm" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <Badge key={index} variant="outline" className="text-sm">
              {tech}
              <button
                type="button"
                onClick={() => removeTech(index)}
                className="ml-2 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Published Switch */}
      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label className="text-base">Publish Experience</Label>
          <div className="text-sm text-muted-foreground">
            Make this experience visible to the public
          </div>
        </div>
        <Switch
          checked={formData.published}
          onCheckedChange={(checked) => handleInputChange('published', checked)}
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : isEditing ? 'Update Experience' : 'Create Experience'}
        </Button>
      </div>
    </form>
  )
}