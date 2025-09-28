'use client'

import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { usePublishExperience } from '../../hooks/use-experiences'
import type { Experience } from '../../experiences.types'

interface PublishToggleProps {
  experience: Experience
  disabled?: boolean
}

export function PublishToggle({ experience, disabled }: PublishToggleProps) {
  const publishMutation = usePublishExperience()

  const handleToggle = (checked: boolean) => {
    publishMutation.mutate({
      id: experience.id,
      published: checked
    })
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={`publish-${experience.id}`}
        checked={experience.published}
        onCheckedChange={handleToggle}
        disabled={disabled || publishMutation.isPending}
      />
      <Label 
        htmlFor={`publish-${experience.id}`}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {experience.published ? 'Published' : 'Draft'}
      </Label>
    </div>
  )
}