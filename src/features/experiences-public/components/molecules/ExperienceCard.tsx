'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ExternalLink, Building } from 'lucide-react'
import { ExperienceMeta } from '../atoms/ExperienceMeta'
import { TechChips } from '../atoms/TechChips'
import { cn } from '@/lib/utils'
import type { Experience } from '../../experiences.types'

interface ExperienceCardProps {
  experience: Experience
  className?: string
}

export function ExperienceCard({ experience, className }: ExperienceCardProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <>
      <Card className={cn(
        'group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50',
        className
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              {/* Company Logo or Initial */}
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                {experience.companyLogoUrl ? (
                  <img
                    src={experience.companyLogoUrl}
                    alt={`${experience.company} logo`}
                    className="w-8 h-8 rounded object-cover"
                  />
                ) : (
                  <span className="text-white font-semibold text-lg">
                    {experience.company.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {experience.role}
                </CardTitle>
                <CardDescription className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <Building className="h-3 w-3" />
                  {experience.company}
                </CardDescription>
              </div>
            </div>

            {/* Published Badge */}
            {experience.published && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800">
                Live
              </Badge>
            )}
          </div>

          {/* Meta Information */}
          <ExperienceMeta
            employmentType={experience.employmentType}
            location={experience.location}
            startDate={experience.startDate}
            endDate={experience.endDate}
            className="mt-2"
          />
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Summary */}
          {experience.summary && (
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
              {experience.summary}
            </p>
          )}

          {/* Tech Stack */}
          {experience.techStack && experience.techStack.length > 0 && (
            <TechChips techStack={experience.techStack} maxDisplay={4} />
          )}

          {/* View More Button */}
          <div className="pt-2">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 dark:group-hover:bg-blue-950 dark:group-hover:text-blue-400 dark:group-hover:border-blue-800 transition-colors"
                >
                  View Details
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </SheetTrigger>
            </Sheet>
          </div>
        </CardContent>

        {/* Hover Effect Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />
      </Card>

      {/* Detail Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="text-left">
            <SheetTitle className="text-xl">{experience.role}</SheetTitle>
            <SheetDescription className="text-base">
              {experience.company} • {experience.location}
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
                <h4 className="font-semibold mb-2">About</h4>
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
                <h4 className="font-semibold mb-2">Technologies Used</h4>
                <TechChips techStack={experience.techStack} maxDisplay={20} />
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}