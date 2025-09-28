'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useDeleteExperience } from '../../hooks/use-experiences'
import type { Experience } from '../../experiences.types'

interface DeleteDialogProps {
  experience?: Experience
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteDialog({ experience, open, onOpenChange }: DeleteDialogProps) {
  const deleteMutation = useDeleteExperience()

  const handleDelete = async () => {
    if (!experience) return

    try {
      await deleteMutation.mutateAsync(experience.id)
      onOpenChange(false)
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  if (!experience) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Experience</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the experience at{' '}
            <span className="font-semibold">{experience.company}</span> as{' '}
            <span className="font-semibold">{experience.role}</span>?
            <br />
            <br />
            This action cannot be undone. This will permanently delete the experience
            and all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete Experience'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}