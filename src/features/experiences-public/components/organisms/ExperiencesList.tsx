'use client'

import { ExperienceCard } from '../molecules/ExperienceCard'
import { ExperienceTimelineItem } from '../molecules/ExperienceTimelineItem'
import { EmptyState } from '../molecules/EmptyState'
import type { Experience, ViewMode } from '../../experiences.types'

interface ExperiencesListProps {
  items: Experience[]
  view: ViewMode
  onResetFilters?: () => void
  hasFilters?: boolean
  className?: string
}

export function ExperiencesList({ 
  items, 
  view, 
  onResetFilters, 
  hasFilters = false, 
  className = '' 
}: ExperiencesListProps) {
  // Show empty state if no items
  if (items.length === 0) {
    return (
      <EmptyState 
        hasFilters={hasFilters} 
        onReset={onResetFilters} 
        className={className} 
      />
    )
  }

  // Grid View
  if (view === 'grid') {
    return (
      <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
        {items.map((experience) => (
          <ExperienceCard 
            key={experience.id} 
            experience={experience}
          />
        ))}
      </div>
    )
  }

  // Timeline View
  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="space-y-0">
        {items.map((experience, index) => (
          <ExperienceTimelineItem
            key={experience.id}
            experience={experience}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </div>
  )
}