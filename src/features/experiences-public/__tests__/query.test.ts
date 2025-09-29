import { describe, it, expect } from 'vitest'
import { 
  mapPublicExperienceQueryToApi, 
  isValidSortValue, 
  clampPage, 
  clampPageSize 
} from '../query'

describe('experiences-public query utils', () => {
  describe('mapPublicExperienceQueryToApi', () => {
    it('should handle empty params with defaults', () => {
      const result = mapPublicExperienceQueryToApi()
      
      expect(result.get('page')).toBe('1')
      expect(result.get('pageSize')).toBe('20')
      expect(result.has('order')).toBe(false)
    })

    it('should map sort values correctly', () => {
      const testCases = [
        { input: 'newest', expected: 'desc' },
        { input: 'oldest', expected: 'asc' },
        { input: 'desc', expected: 'desc' },
        { input: 'asc', expected: 'asc' },
      ]

      testCases.forEach(({ input, expected }) => {
        const result = mapPublicExperienceQueryToApi({ sort: input as any })
        expect(result.get('order')).toBe(expected)
      })
    })

    it('should drop invalid sort values', () => {
      const result = mapPublicExperienceQueryToApi({ sort: 'invalid' as any })
      expect(result.has('order')).toBe(false)
    })

    it('should clamp page and pageSize to valid ranges', () => {
      const result = mapPublicExperienceQueryToApi({
        page: -5,
        pageSize: 200
      })
      
      expect(result.get('page')).toBe('1') // clamped from -5
      expect(result.get('pageSize')).toBe('100') // clamped from 200
    })

    it('should include all valid parameters', () => {
      const result = mapPublicExperienceQueryToApi({
        page: 2,
        pageSize: 10,
        q: 'engineer',
        type: 'Full-time',
        sort: 'newest',
        location: 'Remote'
      })
      
      expect(result.get('page')).toBe('2')
      expect(result.get('pageSize')).toBe('10')
      expect(result.get('q')).toBe('engineer')
      expect(result.get('type')).toBe('Full-time')
      expect(result.get('order')).toBe('desc')
      expect(result.get('location')).toBe('Remote')
    })

    it('should trim whitespace from string parameters', () => {
      const result = mapPublicExperienceQueryToApi({
        q: '  search term  ',
        type: '  Full-time  ',
        location: '  Remote  '
      })
      
      expect(result.get('q')).toBe('search term')
      expect(result.get('type')).toBe('Full-time')
      expect(result.get('location')).toBe('Remote')
    })

    it('should skip empty string parameters', () => {
      const result = mapPublicExperienceQueryToApi({
        q: '',
        type: '   ',
        location: null as any
      })
      
      expect(result.has('q')).toBe(false)
      expect(result.has('type')).toBe(false)
      expect(result.has('location')).toBe(false)
    })
  })

  describe('isValidSortValue', () => {
    it('should validate sort values correctly', () => {
      expect(isValidSortValue('newest')).toBe(true)
      expect(isValidSortValue('oldest')).toBe(true)
      expect(isValidSortValue('desc')).toBe(true)
      expect(isValidSortValue('asc')).toBe(true)
      
      expect(isValidSortValue('invalid')).toBe(false)
      expect(isValidSortValue(123)).toBe(false)
      expect(isValidSortValue(null)).toBe(false)
      expect(isValidSortValue(undefined)).toBe(false)
    })
  })

  describe('clampPage', () => {
    it('should clamp page numbers correctly', () => {
      expect(clampPage(1)).toBe(1)
      expect(clampPage(5)).toBe(5)
      expect(clampPage(0)).toBe(1)
      expect(clampPage(-5)).toBe(1)
      expect(clampPage('3')).toBe(3)
      expect(clampPage('invalid')).toBe(1)
      expect(clampPage(null)).toBe(1)
      expect(clampPage(undefined)).toBe(1)
    })
  })

  describe('clampPageSize', () => {
    it('should clamp page size correctly', () => {
      expect(clampPageSize(20)).toBe(20)
      expect(clampPageSize(1)).toBe(1)
      expect(clampPageSize(100)).toBe(100)
      expect(clampPageSize(0)).toBe(1)
      expect(clampPageSize(150)).toBe(100)
      expect(clampPageSize('50')).toBe(50)
      expect(clampPageSize('invalid')).toBe(20)
      expect(clampPageSize(null)).toBe(20)
      expect(clampPageSize(undefined)).toBe(20)
    })
  })
})