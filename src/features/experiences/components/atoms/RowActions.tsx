'use client'

import { useState } from 'react'
import { MoreVertical, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePublishExperience } from '../../hooks/use-experiences'
import type { Experience } from '../../experiences.types'

interface RowActionsProps {
  experience: Experience
  onEdit?: (experience: Experience) => void
  onDelete?: (experience: Experience) => void
}

export function RowActions({ experience, onEdit, onDelete }: RowActionsProps) {
  const [open, setOpen] = useState(false)
  const publishMutation = usePublishExperience()

  const handleEdit = () => {
    setOpen(false)
    onEdit?.(experience)
  }

  const handleDelete = () => {
    setOpen(false)
    onDelete?.(experience)
  }

  const handleTogglePublish = () => {
    setOpen(false)
    publishMutation.mutate({
      id: experience.id,
      published: !experience.published
    })
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={handleTogglePublish} 
          className="cursor-pointer"
          disabled={publishMutation.isPending}
        >
          {experience.published ? (
            <>
              <EyeOff className="mr-2 h-4 w-4" />
              Unpublish
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" />
              Publish
            </>
          )}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleDelete} 
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}