'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useExperiences } from '@/features/experiences/hooks/use-experiences'
import { ExperiencesTable } from '@/features/experiences/components/organisms/ExperiencesTable'
import { ExperienceForm } from '@/features/experiences/components/molecules/ExperienceForm'
import { DeleteDialog } from '@/features/experiences/components/molecules/DeleteDialog'
import type { Experience } from '@/features/experiences/experiences.types'

export default function ExperiencesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedExperience, setSelectedExperience] = useState<Experience | undefined>()

  const { data, isLoading, isError } = useExperiences({
    page,
    q: searchQuery || undefined,
    pageSize: 20
  })

  const handleCreateClick = () => {
    setSelectedExperience(undefined)
    setCreateDialogOpen(true)
  }

  const handleEditClick = (experience: Experience) => {
    setSelectedExperience(experience)
    setEditDialogOpen(true)
  }

  const handleDeleteClick = (experience: Experience) => {
    setSelectedExperience(experience)
    setDeleteDialogOpen(true)
  }

  const handleFormSuccess = () => {
    setCreateDialogOpen(false)
    setEditDialogOpen(false)
    setSelectedExperience(undefined)
  }

  const handleFormCancel = () => {
    setCreateDialogOpen(false)
    setEditDialogOpen(false)
    setSelectedExperience(undefined)
  }

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false)
    setSelectedExperience(undefined)
  }

  return (
    <div className="container mx-auto p-6">
      <ExperiencesTable
        data={data}
        isLoading={isLoading}
        isError={isError}
        onCreateClick={handleCreateClick}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentPage={page}
        onPageChange={setPage}
      />

      {/* Create Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Experience</DialogTitle>
          </DialogHeader>
          <ExperienceForm
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Experience</DialogTitle>
          </DialogHeader>
          <ExperienceForm
            experience={selectedExperience}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <DeleteDialog
        experience={selectedExperience}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </div>
  )
}