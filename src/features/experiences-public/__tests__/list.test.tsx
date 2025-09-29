import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ExperiencesList } from '../components/organisms/ExperiencesList'
import type { Experience } from '../experiences.types'

// Mock the molecular components
vi.mock('../components/molecules/ExperienceCard', () => ({
  ExperienceCard: ({ experience }: { experience: Experience }) => (
    <div data-testid={`experience-card-${experience.id}`}>
      {experience.role} at {experience.company}
    </div>
  ),
}))

vi.mock('../components/molecules/ExperienceTimelineItem', () => ({
  ExperienceTimelineItem: ({ experience }: { experience: Experience }) => (
    <div data-testid={`experience-timeline-${experience.id}`}>
      {experience.role} at {experience.company}
    </div>
  ),
}))

vi.mock('../components/molecules/EmptyState', () => ({
  EmptyState: ({ hasFilters }: { hasFilters: boolean }) => (
    <div data-testid="empty-state">
      {hasFilters ? 'No matching experiences' : 'No experiences yet'}
    </div>
  ),
}))

const mockExperiences: Experience[] = [
  {
    id: '1',
    role: 'Senior Software Engineer',
    company: 'Tech Corp',
    startDate: '2023-01-01',
    endDate: null,
    location: 'Remote',
    employmentType: 'Full-time',
    summary: 'Leading development team',
    techStack: ['React', 'TypeScript', 'Node.js'],
    highlights: ['Built scalable architecture'],
    published: true,
    companyLogoUrl: null,
    order: 1,
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
  },
  {
    id: '2',
    role: 'Frontend Developer',
    company: 'Startup Inc',
    startDate: '2022-01-01',
    endDate: '2022-12-31',
    location: 'Jakarta',
    employmentType: 'Contract',
    summary: 'Frontend development',
    techStack: ['Vue.js', 'JavaScript'],
    highlights: ['Improved performance'],
    published: true,
    companyLogoUrl: null,
    order: 2,
    createdAt: '2022-01-01',
    updatedAt: '2022-01-01',
  },
]

describe('ExperiencesList', () => {
  it('should render grid view with correct number of cards', () => {
    render(
      <ExperiencesList 
        items={mockExperiences} 
        view="grid" 
      />
    )

    expect(screen.getByTestId('experience-card-1')).toBeInTheDocument()
    expect(screen.getByTestId('experience-card-2')).toBeInTheDocument()
    expect(screen.getByText('Senior Software Engineer at Tech Corp')).toBeInTheDocument()
    expect(screen.getByText('Frontend Developer at Startup Inc')).toBeInTheDocument()
  })

  it('should render timeline view with correct number of items', () => {
    render(
      <ExperiencesList 
        items={mockExperiences} 
        view="timeline" 
      />
    )

    expect(screen.getByTestId('experience-timeline-1')).toBeInTheDocument()
    expect(screen.getByTestId('experience-timeline-2')).toBeInTheDocument()
    expect(screen.getByText('Senior Software Engineer at Tech Corp')).toBeInTheDocument()
    expect(screen.getByText('Frontend Developer at Startup Inc')).toBeInTheDocument()
  })

  it('should show empty state when no items', () => {
    render(
      <ExperiencesList 
        items={[]} 
        view="grid" 
      />
    )

    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
    expect(screen.getByText('No experiences yet')).toBeInTheDocument()
  })

  it('should show filtered empty state when has filters', () => {
    render(
      <ExperiencesList 
        items={[]} 
        view="grid" 
        hasFilters={true}
      />
    )

    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
    expect(screen.getByText('No matching experiences')).toBeInTheDocument()
  })

  it('should render same number of items regardless of view mode', () => {
    const { rerender } = render(
      <ExperiencesList 
        items={mockExperiences} 
        view="grid" 
      />
    )

    const gridCards = screen.getAllByText(/at/)
    expect(gridCards).toHaveLength(2)

    rerender(
      <ExperiencesList 
        items={mockExperiences} 
        view="timeline" 
      />
    )

    const timelineItems = screen.getAllByText(/at/)
    expect(timelineItems).toHaveLength(2)
  })
})