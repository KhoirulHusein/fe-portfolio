'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Briefcase, RotateCcw } from 'lucide-react'

interface EmptyStateProps {
  hasFilters?: boolean
  onReset?: () => void
  className?: string
}

export function EmptyState({ hasFilters = false, onReset, className = '' }: EmptyStateProps) {
  if (hasFilters) {
    return (
      <Card className={`mx-auto max-w-md ${className}`}>
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-xl">No Matching Experiences</CardTitle>
          <CardDescription className="text-base">
            We couldn't find any experiences that match your current filters.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Try adjusting your search terms or removing some filters to see more results.
          </p>
          {onReset && (
            <Button onClick={onReset} variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Clear All Filters
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`mx-auto max-w-md ${className}`}>
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center">
          <Briefcase className="w-8 h-8 text-gray-600 dark:text-gray-400" />
        </div>
        <CardTitle className="text-xl">No Experiences Yet</CardTitle>
        <CardDescription className="text-base">
          Professional experiences will appear here once they are published.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm text-muted-foreground">
          Check back later to see the latest professional journey and achievements.
        </p>
      </CardContent>
    </Card>
  )
}