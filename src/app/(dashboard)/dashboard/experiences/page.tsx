'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Plus } from 'lucide-react'
import { adminService } from '@/lib/admin.service'
import { toast } from 'sonner'

export default function ExperiencesPage() {
  const { data: experiences, isLoading, error } = useQuery({
    queryKey: ['admin-experiences'],
    queryFn: adminService.getExperiences,
    retry: 2,
  })

  if (error) {
    toast.error('Failed to load experiences')
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      })
    } catch {
      return 'Unknown'
    }
  }

  const formatDateRange = (startDate: string, endDate?: string) => {
    const start = formatDate(startDate)
    const end = endDate ? formatDate(endDate) : 'Present'
    return `${start} - ${end}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Experiences</h1>
          <p className="text-muted-foreground">
            Manage your work experiences
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          // Loading skeletons
          [1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle>
                      <Skeleton className="h-6 w-64" />
                    </CardTitle>
                    <CardDescription>
                      <Skeleton className="h-4 w-48" />
                    </CardDescription>
                    <CardDescription>
                      <Skeleton className="h-4 w-32" />
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Skeleton className="h-9 w-16" />
                    <Skeleton className="h-9 w-16" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : experiences && experiences.length > 0 ? (
          // Actual experiences
          experiences.map((experience) => (
            <Card key={experience.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle>{experience.title}</CardTitle>
                    <CardDescription className="font-medium">
                      {experience.company}
                    </CardDescription>
                    <CardDescription>
                      {experience.location} • {formatDateRange(experience.startDate, experience.endDate)}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {experience.description}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          // Empty state
          <Card className="flex flex-col items-center justify-center py-16">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-medium">No experiences yet</h3>
              <p className="text-muted-foreground">
                Add your work experiences to showcase your professional journey.
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Experience
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}