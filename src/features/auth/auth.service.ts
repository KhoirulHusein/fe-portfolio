import { http, normalizeResponse, mapApiError } from '@/lib/http'
import { AUTH } from '@/lib/endpoint'
import { LoginFormData, RegisterFormData, ForgotFormData, User } from './auth.schema'

export const authService = {
  async login(payload: LoginFormData): Promise<void> {
    try {
      await http.post(AUTH.LOGIN, { json: payload })
    } catch (error: any) {
      throw mapApiError(error)
    }
  },

  async register(payload: RegisterFormData): Promise<void> {
    try {
      await http.post(AUTH.REGISTER, { json: payload })
    } catch (error: any) {
      throw mapApiError(error)
    }
  },

  async forgotPassword(payload: ForgotFormData): Promise<void> {
    try {
      await http.post(AUTH.FORGOT, { json: payload })
    } catch (error: any) {
      throw mapApiError(error)
    }
  },

  async me(): Promise<User | null> {
    try {
      const response = await http.get(AUTH.ME).json()
      const user = normalizeResponse<User>(response)
      return user
    } catch (error: any) {
      // If 401/403, user is not authenticated
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return null
      }
      throw error
    }
  },

  async logout(): Promise<void> {
    try {
      await http.post(AUTH.LOGOUT)
    } catch (error: any) {
      // Even if logout fails, we treat it as success on frontend
      console.warn('Logout request failed:', error.message)
    }
  },
}