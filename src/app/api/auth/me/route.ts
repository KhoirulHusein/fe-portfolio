import { NextRequest, NextResponse } from 'next/server'

const API_BASE = process.env.API_BASE_URL
const SESSION_COOKIE_NAME = 'portfolio_session'

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value

    console.log('[API /auth/me] Session cookie:', sessionCookie ? 'exists' : 'missing')

    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, message: 'No session found' },
        { status: 401 }
      )
    }

    console.log('[API /auth/me] Fetching from backend:', `${API_BASE}/auth/me`)

    const response = await fetch(`${API_BASE}/auth/me`, {
      headers: {
        'Cookie': `${SESSION_COOKIE_NAME}=${sessionCookie}`,
      },
      credentials: 'include',
      cache: 'no-store',
    })

    const data = await response.json()
    
    console.log('[API /auth/me] Backend response:', response.status, data)

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Get user API error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
