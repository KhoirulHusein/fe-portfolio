'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { adminService } from '@/lib/admin.service'
import { toast } from 'sonner'

export default function DashboardPage() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: adminService.getDashboardStats,
    retry: 3,
    retryDelay: 1000,
  })

  const { data: projects } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: adminService.getProjects,
    retry: 2,
  })

  // Show error toast if API fails
  if (error) {
    toast.error('Failed to load dashboard data')
  }

  const formatLastUpdated = (dateString: string) => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffTime = Math.abs(now.getTime() - date.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return `${diffDays} days ago`
    } catch {
      return 'Unknown'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your portfolio dashboard. Overview of your content.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                stats?.totalProjects ?? 0
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Projects in your portfolio
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Experiences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                stats?.totalExperiences ?? 0
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Work experiences listed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Last Updated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : stats?.lastUpdated ? (
                formatLastUpdated(stats.lastUpdated)
              ) : (
                'Never'
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Days since last content update
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>
              Your most recently updated projects
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {projects && projects.length > 0 ? (
              projects.slice(0, 3).map((project) => (
                <div key={project.id} className="flex items-center space-x-4">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">{project.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {project.technologies.slice(0, 3).join(', ')}
                    </p>
                  </div>
                </div>
              ))
            ) : isLoading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-4 w-4 rounded" />
                  <div className="space-y-1 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No projects yet</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks you might want to perform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-col space-y-2">
              <button className="h-9 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                Add New Project
              </button>
              <button className="h-9 px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-accent transition-colors">
                Add Experience
              </button>
              <button className="h-9 px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-accent transition-colors">
                Update About
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}