'use client'

import { Badge } from '@/components/ui/badge'
import { Code } from 'lucide-react'

interface TechChipsProps {
  techStack: string[]
  maxDisplay?: number
  className?: string
}

export function TechChips({ techStack, maxDisplay = 5, className = '' }: TechChipsProps) {
  if (!techStack || techStack.length === 0) return null

  const displayTechs = techStack.slice(0, maxDisplay)
  const remainingCount = techStack.length - maxDisplay

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      <Code className="h-3 w-3 text-muted-foreground" />
      {displayTechs.map((tech) => (
        <Badge 
          key={tech} 
          variant="outline" 
          className="text-xs bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300"
        >
          {tech}
        </Badge>
      ))}
      {remainingCount > 0 && (
        <Badge 
          variant="outline" 
          className="text-xs bg-gray-50 border-gray-200 text-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400"
        >
          +{remainingCount} more
        </Badge>
      )}
    </div>
  )
}