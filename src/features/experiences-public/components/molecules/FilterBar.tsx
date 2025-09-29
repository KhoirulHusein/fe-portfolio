'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDebounce } from '@/hooks/use-debounce'
import type { PublicExperienceFilters } from '../../experiences.types'

interface FilterBarProps {
  filters: PublicExperienceFilters
  onFiltersChange: (filters: PublicExperienceFilters) => void
  className?: string
}

const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']
const locations = ['Remote', 'Jakarta', 'Bandung', 'Surabaya', 'Singapore', 'Kuala Lumpur']

export function FilterBar({ filters, onFiltersChange, className = '' }: FilterBarProps) {
  const [searchValue, setSearchValue] = useState(filters.q || '')
  
  // Debounce search query to avoid too many API calls
  const debouncedSearch = useDebounce(searchValue, 300)

  // Update filters when debounced search changes
  useEffect(() => {
    if (debouncedSearch !== filters.q) {
      onFiltersChange({ ...filters, q: debouncedSearch, page: 1 })
    }
  }, [debouncedSearch, filters, onFiltersChange])

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value)
  }, [])

  const handleEmploymentTypeToggle = useCallback((type: string) => {
    const newType = filters.type === type ? '' : type
    onFiltersChange({ ...filters, type: newType, page: 1 })
  }, [filters, onFiltersChange])

  const handleSortChange = useCallback((sort: 'newest' | 'oldest') => {
    onFiltersChange({ ...filters, sort, page: 1 })
  }, [filters, onFiltersChange])

  const handleLocationChange = useCallback((location: string) => {
    const newLocation = location === 'all' ? '' : location
    onFiltersChange({ ...filters, location: newLocation, page: 1 })
  }, [filters, onFiltersChange])

  const clearFilters = useCallback(() => {
    setSearchValue('')
    onFiltersChange({ page: 1 })
  }, [onFiltersChange])

  const hasActiveFilters = filters.q || filters.type || filters.location

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search experiences by role, company, or tech stack..."
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filters:</span>
        </div>

        {/* Employment Type Chips */}
        <div className="flex flex-wrap gap-1">
          {employmentTypes.map((type) => (
            <Button
              key={type}
              variant={filters.type === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleEmploymentTypeToggle(type)}
              className="h-7 text-xs"
            >
              {type}
            </Button>
          ))}
        </div>

        {/* Sort Select */}
        <Select
          value={filters.sort || 'newest'}
          onValueChange={handleSortChange}
        >
          <SelectTrigger className="w-32 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>

        {/* Location Select */}
        <Select
          value={filters.location || 'all'}
          onValueChange={handleLocationChange}
        >
          <SelectTrigger className="w-40 h-8">
            <SelectValue placeholder="All locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-7 text-xs text-muted-foreground"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          {filters.q && (
            <Badge variant="secondary" className="text-xs">
              Search: "{filters.q}"
            </Badge>
          )}
          {filters.type && (
            <Badge variant="secondary" className="text-xs">
              Type: {filters.type}
            </Badge>
          )}
          {filters.location && (
            <Badge variant="secondary" className="text-xs">
              Location: {filters.location}
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}