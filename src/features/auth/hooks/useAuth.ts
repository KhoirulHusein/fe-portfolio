'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService } from '../auth.service'
import { User, LoginFormData, RegisterFormData, ForgotFormData } from '../auth.schema'

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated'

interface AuthState {
  user: User | null
  status: AuthStatus
}

interface AuthActions {
  login: (payload: LoginFormData) => Promise<void>
  register: (payload: RegisterFormData) => Promise<void>
  forgotPassword: (payload: ForgotFormData) => Promise<void>
  logout: () => Promise<void>
  refreshMe: () => Promise<void>
  setStatus: (status: AuthStatus) => void
}

export const useAuth = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      status: 'idle',

      // Actions
      setStatus: (status: AuthStatus) => set({ status }),

      login: async (payload: LoginFormData) => {
        set({ status: 'loading' })
        try {
          await authService.login(payload)
          await get().refreshMe()
        } catch (error: any) {
          set({ status: 'unauthenticated' })
          throw error
        }
      },

      register: async (payload: RegisterFormData) => {
        set({ status: 'loading' })
        try {
          await authService.register(payload)
          // After successful registration, user needs to login
          set({ status: 'unauthenticated' })
        } catch (error: any) {
          set({ status: 'unauthenticated' })
          throw error
        }
      },

      forgotPassword: async (payload: ForgotFormData) => {
        try {
          await authService.forgotPassword(payload)
        } catch (error: any) {
          throw error
        }
      },

      refreshMe: async () => {
        set({ status: 'loading' })
        try {
          const user = await authService.me()
          if (user) {
            set({ user, status: 'authenticated' })
          } else {
            set({ user: null, status: 'unauthenticated' })
          }
        } catch (error) {
          set({ user: null, status: 'unauthenticated' })
        }
      },

      logout: async () => {
        set({ status: 'loading' })
        try {
          await authService.logout()
        } catch (error) {
          // Continue with logout even if request fails
        } finally {
          set({ user: null, status: 'unauthenticated' })
        }
      },
    }),
    {
      name: 'auth-storage',
      // Only persist user data, not status
      partialize: (state) => ({ user: state.user }),
    }
  )
)