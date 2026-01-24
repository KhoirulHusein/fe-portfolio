import { NextRequest, NextResponse } from 'next/server'

const API_BASE = process.env.API_BASE_URL

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Login request to:', `${API_BASE}/auth/login`)
    
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    
    console.log('Login response status:', response.status)
    console.log('Login response data:', data)

    // Create response with the data
    const nextResponse = NextResponse.json(data, { status: response.status })

    // Forward ALL Set-Cookie headers from API to client
    const setCookieHeaders = response.headers.getSetCookie()
    console.log('Set-Cookie headers:', setCookieHeaders)
    
    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach(cookie => {
        nextResponse.headers.append('Set-Cookie', cookie)
      })
    }

    return nextResponse
  } catch (error) {
    console.error('Login API error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
