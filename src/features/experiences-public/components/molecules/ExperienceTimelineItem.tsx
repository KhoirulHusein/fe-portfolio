'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ExternalLink, Building, Calendar } from 'lucide-react'
import { ExperienceMeta } from '../atoms/ExperienceMeta'
import { TechChips } from '../atoms/TechChips'
import { getRelativeTime } from '@/lib/date'
import { cn } from '@/lib/utils'
import type { Experience } from '../../experiences.types'

interface ExperienceTimelineItemProps {
  experience: Experience
  isLast?: boolean
  className?: string
}

export function ExperienceTimelineItem({ experience, isLast = false, className }: ExperienceTimelineItemProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <>
      <div className={cn('relative flex items-start gap-6 pb-8', className)}>
        {/* Timeline Line and Dot */}
        <div className="relative flex flex-col items-center">
          {/* Dot */}
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 border-4 border-white dark:border-gray-900 shadow-lg z-10" />
          
          {/* Vertical Line */}
          {!isLast && (
            <div className="w-0.5 h-full bg-gradient-to-b from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 mt-2" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pb-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 flex-1">
                {/* Company Logo */}
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  {experience.companyLogoUrl ? (
                    <img
                      src={experience.companyLogoUrl}
                      alt={`${experience.company} logo`}
                      className="w-6 h-6 rounded object-cover"
                    />
                  ) : (
                    <span className="text-white font-semibold text-sm">
                      {experience.company.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    {experience.role}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <Building className="h-3 w-3" />
                    <span className="font-medium">{experience.company}</span>
                  </div>
                </div>
              </div>

              {/* Duration Badge */}
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {getRelativeTime(experience.startDate, experience.endDate)}
              </Badge>
            </div>

            {/* Meta Information */}
            <ExperienceMeta
              employmentType={experience.employmentType}
              location={experience.location}
              startDate={experience.startDate}
              endDate={experience.endDate}
              className="mb-4"
            />

            {/* Summary */}
            {experience.summary && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
                {experience.summary}
              </p>
            )}

            {/* Tech Stack */}
            {experience.techStack && experience.techStack.length > 0 && (
              <div className="mb-4">
                <TechChips techStack={experience.techStack} maxDisplay={6} />
              </div>
            )}

            {/* View Details Button */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:hover:bg-blue-950 dark:hover:text-blue-400 dark:hover:border-blue-800 transition-colors"
                >
                  View Full Details
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </SheetTrigger>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Detail Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="text-left">
            <SheetTitle className="text-xl">{experience.role}</SheetTitle>
            <SheetDescription className="text-base">
              {experience.company} • {getRelativeTime(experience.startDate, experience.endDate)}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Meta */}
            <ExperienceMeta
              employmentType={experience.employmentType}
              location={experience.location}
              startDate={experience.startDate}
              endDate={experience.endDate}
            />

            {/* Summary */}
            {experience.summary && (
              <div>
                <h4 className="font-semibold mb-2">About This Role</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {experience.summary}
                </p>
              </div>
            )}

            {/* Highlights */}
            {experience.highlights && experience.highlights.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Key Achievements</h4>
                <ul className="space-y-2">
                  {experience.highlights.map((highlight, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            {experience.techStack && experience.techStack.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Technologies & Tools</h4>
                <TechChips techStack={experience.techStack} maxDisplay={20} />
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}