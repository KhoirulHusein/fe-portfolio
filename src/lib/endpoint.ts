export const AUTH = {
  LOGIN: 'api/v1/auth/login',
  REGISTER: 'api/v1/auth/register',
  FORGOT: 'api/v1/auth/forgot-password',
  ME: 'api/v1/auth/me',
  LOGOUT: 'api/v1/auth/logout',
} as const

export const ADMIN = {
  ABOUT: 'api/v1/admin/about',
  PROJECTS: 'api/v1/admin/projects',
  EXPERIENCES: 'api/v1/admin/experiences',
  DASHBOARD_STATS: 'api/v1/admin/dashboard/stats',
} as const

export const PUBLIC = {
  EXPERIENCES: 'api/v1/experiences',
  // Alternative if backend has public route: 'api/v1/public/experiences'
} as const