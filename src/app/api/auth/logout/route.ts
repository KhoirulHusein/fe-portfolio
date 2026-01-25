import { NextRequest, NextResponse } from 'next/server'

const API_BASE = process.env.API_BASE_URL
const SESSION_COOKIE_NAME = 'portfolio_session'

export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value

    const response = await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(sessionCookie && { 'Cookie': `${SESSION_COOKIE_NAME}=${sessionCookie}` }),
      },
      credentials: 'include',
    })

    const data = await response.json()

    // Create response and clear cookie
    const nextResponse = NextResponse.json(data, { status: response.status })
    nextResponse.cookies.delete(SESSION_COOKIE_NAME)

    return nextResponse
  } catch (error) {
    console.error('Logout API error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
