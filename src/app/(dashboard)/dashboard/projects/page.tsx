'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Plus, ExternalLink, Github } from 'lucide-react'
import { adminService } from '@/lib/admin.service'
import { toast } from 'sonner'

export default function ProjectsPage() {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: adminService.getProjects,
    retry: 2,
  })

  if (error) {
    toast.error('Failed to load projects')
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString()
    } catch {
      return 'Unknown'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage your portfolio projects
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      <div className="grid gap-6">
        {isLoading ? (
          // Loading skeletons
          [1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      <Skeleton className="h-6 w-48" />
                    </CardTitle>
                    <CardDescription className="mt-2">
                      <Skeleton className="h-4 w-96" />
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Skeleton className="h-9 w-16" />
                    <Skeleton className="h-9 w-16" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-10" />
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : projects && projects.length > 0 ? (
          // Actual projects
          projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {project.description}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live
                        </a>
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Created: {formatDate(project.createdAt)}</span>
                    <span>Updated: {formatDate(project.updatedAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          // Empty state
          <Card className="flex flex-col items-center justify-center py-16">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-medium">No projects yet</h3>
              <p className="text-muted-foreground">
                Start building your portfolio by adding your first project.
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Project
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}