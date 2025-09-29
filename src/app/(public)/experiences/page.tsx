'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertTriangle, RefreshCw, LayoutGrid, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { usePublicExperiences } from '@/features/experiences-public/hooks/use-experiences-public'
import { FilterBar } from '@/features/experiences-public/components/molecules/FilterBar'
import { ExperiencesList } from '@/features/experiences-public/components/organisms/ExperiencesList'
import { Hero } from '@/features/experiences-public/components/molecules/Hero'
import type { PublicExperienceFilters, ViewMode } from '@/features/experiences-public/experiences.types'

export default function ExperiencesPage() {
  const [filters, setFilters] = useState<PublicExperienceFilters>({ 
    page: 1, 
    q: '', 
    type: '', 
    sort: 'newest', 
    location: '' 
  })
  const [view, setView] = useState<ViewMode>('timeline')

  const { data, isLoading, isError, error, refetch } = usePublicExperiences(filters)

  const handleFiltersChange = (newFilters: PublicExperienceFilters) => {
    setFilters(newFilters)
  }

  const handleResetFilters = () => {
    setFilters({ page: 1 })
  }

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }))
  }

  const hasActiveFilters = Boolean(filters.q || filters.type || filters.location)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* View Toggle and Filter Bar */}
        <div className="mb-8 space-y-6">
          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Professional Timeline
            </h2>
            <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <Button
                variant={view === 'timeline' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('timeline')}
                className="flex items-center gap-2"
              >
                <Clock className="w-4 h-4" />
                Timeline
              </Button>
              <Button
                variant={view === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('grid')}
                className="flex items-center gap-2"
              >
                <LayoutGrid className="w-4 h-4" />
                Grid
              </Button>
            </div>
          </div>

          {/* Filter Bar */}
          <FilterBar 
            filters={filters} 
            onFiltersChange={handleFiltersChange}
          />
        </div>

        {/* Results Info */}
        {!isLoading && !isError && data && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">
                Showing {data.items.length} of {data.total} experiences
              </p>
              {hasActiveFilters && (
                <Badge variant="secondary" className="text-xs">
                  Filtered Results
                </Badge>
              )}
            </div>
            {data.totalPages > 1 && (
              <p className="text-sm text-muted-foreground">
                Page {data.page} of {data.totalPages}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          // Loading State
          <div className="space-y-6">
            {view === 'grid' ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-lg" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                      <Skeleton className="h-20 w-full" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-14" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <div className="w-4 h-4 rounded-full bg-gray-200 flex-shrink-0 mt-2" />
                    <Card className="flex-1 p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Skeleton className="w-10 h-10 rounded-lg" />
                          <div className="space-y-2">
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-3 w-32" />
                          </div>
                        </div>
                        <Skeleton className="h-16 w-full" />
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : isError ? (
          // Error State
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center space-y-4">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Failed to Load Experiences</h3>
                <p className="text-sm text-muted-foreground">
                  {error?.message || 'Something went wrong while loading experiences.'}
                </p>
              </div>
              <Button onClick={() => refetch()} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : (
          // Success State
          <div>
            <ExperiencesList
              items={data?.items || []}
              view={view}
              hasFilters={hasActiveFilters}
              onResetFilters={handleResetFilters}
            />
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !isError && data && data.totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => handlePageChange(data.page - 1)}
              disabled={data.page <= 1}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
                const pageNum = i + 1
                const isActive = pageNum === data.page
                
                return (
                  <Button
                    key={pageNum}
                    variant={isActive ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className="w-10 h-10 p-0"
                  >
                    {pageNum}
                  </Button>
                )
              })}
              
              {data.totalPages > 5 && (
                <>
                  <span className="px-2 text-muted-foreground">...</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(data.totalPages)}
                    className="w-10 h-10 p-0"
                  >
                    {data.totalPages}
                  </Button>
                </>
              )}
            </div>

            <Button
              variant="outline"
              onClick={() => handlePageChange(data.page + 1)}
              disabled={data.page >= data.totalPages}
              className="gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}