import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getPublicExperiences } from '../experiences.service'
import { http } from '@/lib/http'

// Mock the http client
vi.mock('@/lib/http', () => ({
  http: {
    get: vi.fn(),
  },
  normalizeResponse: vi.fn((data) => data),
  mapApiError: vi.fn((error) => error),
}))

// Mock the endpoint
vi.mock('@/lib/endpoint', () => ({
  PUBLIC: {
    EXPERIENCES: 'api/v1/experiences'
  }
}))

// Mock the query utility
vi.mock('../query', () => ({
  mapPublicExperienceQueryToApi: vi.fn((params = {}) => {
    const searchParams = new URLSearchParams()
    if (params.page) searchParams.set('page', params.page.toString())
    if (params.pageSize) searchParams.set('pageSize', params.pageSize.toString())
    if (params.q) searchParams.set('q', params.q)
    if (params.type) searchParams.set('type', params.type)
    if (params.sort === 'oldest') searchParams.set('order', 'asc')
    else if (params.sort === 'newest') searchParams.set('order', 'desc')
    if (params.location) searchParams.set('location', params.location)
    return searchParams
  }),
}))

const mockHttp = http as any

describe('experiences.service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getPublicExperiences', () => {
    it('should fetch experiences without parameters', async () => {
      const mockResponse = {
        items: [
          {
            id: '1',
            role: 'Software Engineer',
            company: 'Tech Corp',
            startDate: '2023-01-01',
            endDate: null,
            published: true,
          },
        ],
        page: 1,
        pageSize: 20,
        total: 1,
        totalPages: 1,
      }

      mockHttp.get.mockReturnValue({
        json: vi.fn().mockResolvedValue(mockResponse),
      })

      const result = await getPublicExperiences()

      expect(mockHttp.get).toHaveBeenCalledWith('api/v1/experiences')
      expect(result).toEqual(mockResponse)
    })

    it('should fetch experiences with search parameters', async () => {
      const mockResponse = {
        items: [],
        page: 1,
        pageSize: 10,
        total: 0,
        totalPages: 1,
      }

      mockHttp.get.mockReturnValue({
        json: vi.fn().mockResolvedValue(mockResponse),
      })

      await getPublicExperiences({
        page: 2,
        pageSize: 10,
        q: 'engineer',
        type: 'Full-time',
        sort: 'oldest',
        location: 'Remote',
      })

      expect(mockHttp.get).toHaveBeenCalledWith(
        'api/v1/experiences?page=2&pageSize=10&q=engineer&type=Full-time&order=asc&location=Remote'
      )
    })

    it('should handle network errors gracefully', async () => {
      mockHttp.get.mockReturnValue({
        json: vi.fn().mockRejectedValue(new Error('NetworkError')),
      })

      await expect(getPublicExperiences()).rejects.toThrow('NetworkError')
    })

    it('should handle 404 errors gracefully', async () => {
      const error = new Error('404')
      mockHttp.get.mockReturnValue({
        json: vi.fn().mockRejectedValue(error),
      })

      await expect(getPublicExperiences()).rejects.toThrow('404')
    })

    it('should handle 500 errors gracefully', async () => {
      const error = new Error('500')
      mockHttp.get.mockReturnValue({
        json: vi.fn().mockRejectedValue(error),
      })

      await expect(getPublicExperiences()).rejects.toThrow('500')
    })

    it('should handle generic errors gracefully', async () => {
      const error = new Error('Something went wrong')
      mockHttp.get.mockReturnValue({
        json: vi.fn().mockRejectedValue(error),
      })

      await expect(getPublicExperiences()).rejects.toThrow('Something went wrong')
    })

    it('should handle non-Error objects', async () => {
      mockHttp.get.mockReturnValue({
        json: vi.fn().mockRejectedValue('String error'),
      })

      await expect(getPublicExperiences()).rejects.toThrow('String error')
    })
  })

  describe('Response shape handling', () => {
    it('should handle direct array response', async () => {
      const mockArrayResponse = [
        { id: '1', title: 'Experience 1' },
        { id: '2', title: 'Experience 2' },
      ]

      mockHttp.get.mockReturnValue({
        json: vi.fn().mockResolvedValue(mockArrayResponse),
      })

      const result = await getPublicExperiences()

      expect(result).toEqual({
        items: mockArrayResponse,
        page: 1,
        pageSize: 2,
        total: 2,
        totalPages: 1,
      })
    })

    it('should handle paginated response', async () => {
      const mockPaginatedResponse = {
        items: [{ id: '1', title: 'Experience 1' }],
        page: 1,
        pageSize: 20,
        total: 1,
        totalPages: 1,
      }

      mockHttp.get.mockReturnValue({
        json: vi.fn().mockResolvedValue(mockPaginatedResponse),
      })

      const result = await getPublicExperiences()

      expect(result).toEqual(mockPaginatedResponse)
    })

    it('should handle malformed response gracefully', async () => {
      const mockMalformedResponse = {
        someOtherField: 'data'
      }

      mockHttp.get.mockReturnValue({
        json: vi.fn().mockResolvedValue(mockMalformedResponse),
      })

      const result = await getPublicExperiences()

      expect(result).toEqual({
        items: [],
        page: 1,
        pageSize: 0,
        total: 0,
        totalPages: 1,
      })
    })
  })
})