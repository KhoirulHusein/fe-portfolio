import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FilterBar } from '../components/molecules/FilterBar'
import type { PublicExperienceFilters } from '../experiences.types'

// Mock the useDebounce hook
vi.mock('@/hooks/use-debounce', () => ({
  useDebounce: vi.fn((value) => value), // Return value immediately for testing
}))

describe('FilterBar', () => {
  const mockFilters: PublicExperienceFilters = {
    page: 1,
    q: '',
    type: '',
    sort: 'newest',
    location: '',
  }

  const mockOnFiltersChange = vi.fn()
  
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render search input with placeholder', () => {
    render(
      <FilterBar 
        filters={mockFilters} 
        onFiltersChange={mockOnFiltersChange} 
      />
    )

    expect(
      screen.getByPlaceholderText('Search experiences by role, company, or tech stack...')
    ).toBeInTheDocument()
  })

  it('should render employment type filter buttons', () => {
    render(
      <FilterBar 
        filters={mockFilters} 
        onFiltersChange={mockOnFiltersChange} 
      />
    )

    expect(screen.getByRole('button', { name: 'Full-time' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Part-time' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Contract' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Freelance' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Internship' })).toBeInTheDocument()
  })

  it('should call onFiltersChange when search input changes', async () => {
    const user = userEvent.setup()
    
    render(
      <FilterBar 
        filters={mockFilters} 
        onFiltersChange={mockOnFiltersChange} 
      />
    )

    const searchInput = screen.getByPlaceholderText('Search experiences by role, company, or tech stack...')
    
    await user.type(searchInput, 'engineer')

    // Since we mocked useDebounce to return immediately, this should trigger
    await waitFor(() => {
      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        ...mockFilters,
        q: 'engineer',
        page: 1,
      })
    })
  })

  it('should toggle employment type filter when chip is clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <FilterBar 
        filters={mockFilters} 
        onFiltersChange={mockOnFiltersChange} 
      />
    )

    const fullTimeButton = screen.getByRole('button', { name: 'Full-time' })
    await user.click(fullTimeButton)

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...mockFilters,
      type: 'Full-time',
      page: 1,
    })
  })

  it('should clear employment type when same chip is clicked twice', async () => {
    const user = userEvent.setup()
    
    const filtersWithType = { ...mockFilters, type: 'Full-time' }
    
    render(
      <FilterBar 
        filters={filtersWithType} 
        onFiltersChange={mockOnFiltersChange} 
      />
    )

    const fullTimeButton = screen.getByRole('button', { name: 'Full-time' })
    await user.click(fullTimeButton)

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...filtersWithType,
      type: '',
      page: 1,
    })
  })

  it('should show active filters when filters are applied', () => {
    const activeFilters = {
      ...mockFilters,
      q: 'engineer',
      type: 'Full-time',
      location: 'Remote',
    }

    render(
      <FilterBar 
        filters={activeFilters} 
        onFiltersChange={mockOnFiltersChange} 
      />
    )

    expect(screen.getByText('Search: "engineer"')).toBeInTheDocument()
    expect(screen.getByText('Type: Full-time')).toBeInTheDocument()
    expect(screen.getByText('Location: Remote')).toBeInTheDocument()
  })

  it('should show Clear All button when filters are active', () => {
    const activeFilters = {
      ...mockFilters,
      q: 'engineer',
    }

    render(
      <FilterBar 
        filters={activeFilters} 
        onFiltersChange={mockOnFiltersChange} 
      />
    )

    expect(screen.getByText('Clear All')).toBeInTheDocument()
  })

  it('should clear all filters when Clear All is clicked', async () => {
    const user = userEvent.setup()
    
    const activeFilters = {
      ...mockFilters,
      q: 'engineer',
      type: 'Full-time',
    }

    render(
      <FilterBar 
        filters={activeFilters} 
        onFiltersChange={mockOnFiltersChange} 
      />
    )

    const clearButton = screen.getByText('Clear All')
    await user.click(clearButton)

    expect(mockOnFiltersChange).toHaveBeenCalledWith({ page: 1 })
  })

  it('should not show Clear All button when no filters are active', () => {
    render(
      <FilterBar 
        filters={mockFilters} 
        onFiltersChange={mockOnFiltersChange} 
      />
    )

    expect(screen.queryByText('Clear All')).not.toBeInTheDocument()
  })
})