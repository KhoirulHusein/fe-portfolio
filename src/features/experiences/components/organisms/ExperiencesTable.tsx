'use client'

import { useState } from 'react'
import { Search, Plus, FileX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { PublishBadge } from '../atoms/PublishBadge'
import { RowActions } from '../atoms/RowActions'
import type { Experience, Paginated } from '../../experiences.types'

interface ExperiencesTableProps {
  data?: Paginated<Experience>
  isLoading: boolean
  isError?: boolean
  onCreateClick?: () => void
  onEditClick?: (experience: Experience) => void
  onDeleteClick?: (experience: Experience) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  currentPage: number
  onPageChange: (page: number) => void
}

export function ExperiencesTable({
  data,
  isLoading,
  isError,
  onCreateClick,
  onEditClick,
  onDeleteClick,
  searchQuery,
  onSearchChange,
  currentPage,
  onPageChange,
}: ExperiencesTableProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      })
    } catch {
      return 'Invalid Date'
    }
  }

  const formatDateRange = (startDate: string, endDate: string | null) => {
    const start = formatDate(startDate)
    const end = endDate ? formatDate(endDate) : 'Present'
    return `${start} - ${end}`
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileX className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-semibold text-muted-foreground">Failed to load experiences</p>
          <p className="text-sm text-muted-foreground mt-2">Please try refreshing the page</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Experiences</h1>
          <p className="text-muted-foreground">
            Manage your professional experiences
          </p>
        </div>
        <Button onClick={onCreateClick}>
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search experiences..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>All Experiences</CardTitle>
          <CardDescription>
            {data ? `${data.total} experiences found` : 'Loading...'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            // Loading State
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-8 w-8" />
                </div>
              ))}
            </div>
          ) : !data?.items.length ? (
            // Empty State
            <div className="flex flex-col items-center justify-center py-12">
              <FileX className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-semibold text-muted-foreground">No experiences found</p>
              {searchQuery ? (
                <p className="text-sm text-muted-foreground mt-2">
                  No experiences match your search "{searchQuery}"
                </p>
              ) : (
                <p className="text-sm text-muted-foreground mt-2">
                  Get started by adding your first experience
                </p>
              )}
            </div>
          ) : (
            // Data State
            <div className="space-y-4">
              {data.items.map((experience) => (
                <div
                  key={experience.id}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3">
                      {/* Company Logo */}
                      {experience.companyLogoUrl ? (
                        <img
                          src={experience.companyLogoUrl}
                          alt={`${experience.company} logo`}
                          className="w-12 h-12 rounded-lg object-cover bg-muted flex-shrink-0"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-muted flex-shrink-0 flex items-center justify-center">
                          <span className="text-lg font-semibold text-muted-foreground">
                            {experience.company.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div>
                          <h3 className="font-semibold text-base leading-6 truncate">
                            {experience.role}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {experience.company}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <span>{formatDateRange(experience.startDate, experience.endDate || null)}</span>
                          {experience.location && (
                            <>
                              <span>•</span>
                              <span className="truncate">{experience.location}</span>
                            </>
                          )}
                          {experience.employmentType && (
                            <>
                              <span>•</span>
                              <Badge variant="outline" className="text-xs">
                                {experience.employmentType}
                              </Badge>
                            </>
                          )}
                        </div>

                        {/* Tech Stack */}
                        {experience.techStack && experience.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {experience.techStack.slice(0, 3).map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {experience.techStack.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{experience.techStack.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                    <PublishBadge published={experience.published} />
                    <RowActions
                      experience={experience}
                      onEdit={onEditClick}
                      onDelete={onDeleteClick}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {data.page} of {data.totalPages} ({data.total} total experiences)
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= data.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}