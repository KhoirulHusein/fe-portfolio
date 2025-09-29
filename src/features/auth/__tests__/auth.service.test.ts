import { describe, it, expect, beforeEach, vi, beforeAll, afterEach, afterAll } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { authService } from '../auth.service'
import { useAuth } from '../hooks/useAuth'

// Mock server
const server = setupServer(
  // Login endpoints
  http.post('http://localhost:4000/api/v1/auth/login', async ({ request }) => {
    const body = await request.json() as any
    
    if (body.emailOrUsername === 'test@example.com' && body.password === 'password123') {
      return HttpResponse.json({ success: true })
    }
    
    return HttpResponse.json(
      { error: { message: 'Invalid credentials' } },
      { status: 400 }
    )
  }),

  // Me endpoint
  http.get('http://localhost:4000/api/v1/auth/me', () => {
    return HttpResponse.json({
      success: true,
      data: {
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
        role: 'admin',
        permissions: ['read', 'write']
      }
    })
  }),

  // Me endpoint - unauthenticated
  http.get('http://localhost:4000/api/v1/auth/me', () => {
    return HttpResponse.json(
      { error: { message: 'Unauthorized' } },
      { status: 401 }
    )
  }, { once: true }),

  // Register endpoint
  http.post('http://localhost:4000/api/v1/auth/register', () => {
    return HttpResponse.json({ success: true })
  }),

  // Forgot password endpoint
  http.post('http://localhost:4000/api/v1/auth/forgot-password', () => {
    return HttpResponse.json({ success: true })
  }),

  // Logout endpoint
  http.post('http://localhost:4000/api/v1/auth/logout', () => {
    return HttpResponse.json({ success: true })
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Auth Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      await expect(
        authService.login({
          emailOrUsername: 'test@example.com',
          password: 'password123'
        })
      ).resolves.not.toThrow()
    })

    it('should throw error with invalid credentials', async () => {
      await expect(
        authService.login({
          emailOrUsername: 'wrong@example.com',
          password: 'wrongpassword'
        })
      ).rejects.toThrow('Bad request - please check query parameters')
    })
  })

  describe('register', () => {
    it('should register successfully', async () => {
      await expect(
        authService.register({
          email: 'new@example.com',
          username: 'newuser',
          password: 'password123',
          confirmPassword: 'password123'
        })
      ).resolves.not.toThrow()
    })
  })

  describe('forgotPassword', () => {
    it('should send forgot password request successfully', async () => {
      await expect(
        authService.forgotPassword({
          email: 'test@example.com'
        })
      ).resolves.not.toThrow()
    })
  })

  describe('me', () => {
    it('should return user data when authenticated', async () => {
      const user = await authService.me()
      
      expect(user).toEqual({
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
        role: 'admin',
        permissions: ['read', 'write']
      })
    })

    it('should return null when unauthenticated', async () => {
      // Override the handler to return 401
      server.use(
        http.get('http://localhost:4000/api/v1/auth/me', () => {
          return HttpResponse.json(
            { error: { message: 'Unauthorized' } },
            { status: 401 }
          )
        })
      )

      const user = await authService.me()
      expect(user).toBeNull()
    })
  })

  describe('logout', () => {
    it('should logout successfully', async () => {
      await expect(authService.logout()).resolves.not.toThrow()
    })
  })
})

describe('Auth Store Integration', () => {
  beforeEach(() => {
    // Reset auth store
    useAuth.setState({ user: null, status: 'idle' })
    vi.clearAllMocks()
  })

  it('should update store on successful login', async () => {
    const { login, refreshMe } = useAuth.getState()
    
    await login({
      emailOrUsername: 'test@example.com',
      password: 'password123'
    })
    
    const state = useAuth.getState()
    expect(state.status).toBe('authenticated')
    expect(state.user).toEqual({
      id: '1',
      email: 'test@example.com',
      username: 'testuser',
      role: 'admin',
      permissions: ['read', 'write']
    })
  })

  it('should set unauthenticated status on login failure', async () => {
    const { login } = useAuth.getState()
    
    try {
      await login({
        emailOrUsername: 'wrong@example.com',
        password: 'wrongpassword'
      })
    } catch (error) {
      // Expected to throw
    }
    
    const state = useAuth.getState()
    expect(state.status).toBe('unauthenticated')
    expect(state.user).toBeNull()
  })

  it('should handle unauthenticated me request', async () => {
    // Override to return 401
    server.use(
      http.get('http://localhost:4000/api/v1/auth/me', () => {
        return HttpResponse.json(
          { error: { message: 'Unauthorized' } },
          { status: 401 }
        )
      })
    )

    const { refreshMe } = useAuth.getState()
    await refreshMe()
    
    const state = useAuth.getState()
    expect(state.status).toBe('unauthenticated')
    expect(state.user).toBeNull()
  })
})