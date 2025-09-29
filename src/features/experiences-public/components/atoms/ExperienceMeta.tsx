'use client'

import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, Briefcase } from 'lucide-react'
import { formatDateRange } from '@/lib/date'

interface ExperienceMetaProps {
  employmentType?: string | null
  location?: string | null
  startDate: string
  endDate?: string | null
  className?: string
}

export function ExperienceMeta({ 
  employmentType, 
  location, 
  startDate, 
  endDate, 
  className = '' 
}: ExperienceMetaProps) {
  return (
    <div className={`flex flex-wrap items-center gap-2 text-sm text-muted-foreground ${className}`}>
      {/* Employment Type Badge */}
      {employmentType && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <Briefcase className="h-3 w-3" />
          {employmentType}
        </Badge>
      )}

      {/* Location */}
      {location && (
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span>{location}</span>
        </div>
      )}

      {/* Date Range */}
      <div className="flex items-center gap-1">
        <Calendar className="h-3 w-3" />
        <span>{formatDateRange(startDate, endDate)}</span>
      </div>
    </div>
  )
}