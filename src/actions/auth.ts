'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'

// Use internal API routes that proxy to backend
const getApiBase = () => {
  // In server actions, use absolute URL for internal API routes
  const baseUrl = process.env.API_BASE_URL
  return `${baseUrl}`
}

// Session cookie name from backend
const SESSION_COOKIE_NAME = 'portfolio_session'

interface LoginResponse {
  success: boolean
  message: string
  data?: {
    user: {
      id: string
      name: string
      email: string
      role: string
    }
  }
}

export async function login(email: string, password: string) {
  try {
    const response = await fetch(`${getApiBase()}/auth/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })

    const data: LoginResponse = await response.json()

    if (!response.ok || !data.success) {
      return { error: data.message || 'Login failed' }
    }

    // Forward Set-Cookie from API route response to browser
    const setCookieHeaders = response.headers.getSetCookie()
    if (setCookieHeaders && setCookieHeaders.length > 0) {
      const cookieStore = await cookies()
      
      for (const cookieString of setCookieHeaders) {
        // Parse cookie string to get name and value
        const [nameValue] = cookieString.split(';')
        const [name, value] = nameValue.split('=')
        
        if (name && value) {
          // Parse cookie attributes
          const isSecure = cookieString.toLowerCase().includes('secure')
          const isHttpOnly = cookieString.toLowerCase().includes('httponly')
          const sameSiteMatch = cookieString.match(/samesite=(\w+)/i)
          const sameSite = sameSiteMatch ? sameSiteMatch[1].toLowerCase() as 'lax' | 'strict' | 'none' : 'lax'
          const maxAgeMatch = cookieString.match(/max-age=(\d+)/i)
          const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1]) : undefined
          
          cookieStore.set(name.trim(), decodeURIComponent(value.trim()), {
            httpOnly: isHttpOnly,
            secure: isSecure,
            sameSite,
            maxAge,
            path: '/',
          })
        }
      }
    }

    return { success: true, user: data.data?.user }
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'Something went wrong. Please try again.' }
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value

    if (sessionCookie) {
      await fetch(`${getApiBase()}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `${SESSION_COOKIE_NAME}=${sessionCookie}`,
        },
        credentials: 'include',
      })
    }

    cookieStore.delete(SESSION_COOKIE_NAME)
  } catch (error) {
    console.error('Logout error:', error)
  }
  
  redirect('/login')
}

export async function signup(name: string, email: string, password: string) {
  try {
    const response = await fetch(`${getApiBase()}/auth/signup`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
      credentials: 'include',
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      return { error: data.message || 'Signup failed' }
    }

    return { success: true, message: data.message || 'Account created successfully' }
  } catch (error) {
    console.error('Signup error:', error)
    return { error: 'Something went wrong. Please try again.' }
  }
}

// Cache getCurrentUser to avoid multiple fetches in the same request
// This deduplicates calls within a single React render tree
const getCachedUser = cache(async () => {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value

    if (!sessionCookie) return null

    const response = await fetch(`${getApiBase()}/auth/me`, {
      headers: {
        'Cookie': `${SESSION_COOKIE_NAME}=${sessionCookie}`,
      },
      credentials: 'include',
      // Cache for 30 seconds, revalidate in background
      next: { revalidate: 30 }
    })

    if (!response.ok) return null

    const result = await response.json()
    return result.data || null
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
})

export async function getCurrentUser() {
  return getCachedUser()
}
