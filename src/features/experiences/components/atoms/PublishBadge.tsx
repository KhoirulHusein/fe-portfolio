'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface PublishBadgeProps {
  published: boolean
  className?: string
}

export function PublishBadge({ published, className }: PublishBadgeProps) {
  return (
    <Badge
      variant={published ? 'default' : 'secondary'}
      className={cn(
        'text-xs font-medium',
        published 
          ? 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300' 
          : 'bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300',
        className
      )}
    >
      {published ? 'Published' : 'Unpublished'}
    </Badge>
  )
}