/**
 * Format date string to readable format using Intl API
 * Always uses UTC timezone for consistency
 */
export function formatDateISO(dateString: string | null | undefined): string {
  if (!dateString) return 'Present'

  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en', {
      dateStyle: 'medium',
      timeZone: 'UTC'
    }).format(date)
  } catch {
    return dateString
  }
}

/**
 * Format date range for experience display
 */
export function formatDateRange(startDate: string, endDate?: string | null): string {
  const start = formatDateISO(startDate)
  const end = formatDateISO(endDate)
  return `${start} - ${end}`
}

/**
 * Format date for form inputs (YYYY-MM-DD)
 */
export function formatDateForInput(dateString: string | null | undefined): string {
  if (!dateString) return ''

  try {
    const date = new Date(dateString)
    return date.toISOString().split('T')[0]
  } catch {
    return ''
  }
}

/**
 * Get relative time (e.g., "2 years ago", "Currently")
 */
export function getRelativeTime(startDate: string, endDate?: string | null): string {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()
  
  const diffInMonths = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30))
  
  if (diffInMonths < 1) {
    return 'Less than a month'
  } else if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'}`
  } else {
    const years = Math.floor(diffInMonths / 12)
    const months = diffInMonths % 12
    
    let result = `${years} year${years === 1 ? '' : 's'}`
    if (months > 0) {
      result += `, ${months} month${months === 1 ? '' : 's'}`
    }
    return result
  }
}