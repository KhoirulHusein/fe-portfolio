import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Session cookie name from backend
const SESSION_COOKIE_NAME = 'portfolio_session'

export function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value
  const pathname = request.nextUrl.pathname

  // Debug log
  console.log('[Proxy]', pathname, '| Cookie:', sessionCookie ? 'exists' : 'missing')

  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup')
  const isDashboard = pathname.startsWith('/dashboard')

  // Redirect to login if accessing dashboard without session cookie
  if (isDashboard && !sessionCookie) {
    console.log('[Proxy] No session cookie, redirecting to login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to dashboard if already logged in and trying to access auth pages
  if (isAuthPage && sessionCookie) {
    console.log('[Proxy] Has session cookie, redirecting to dashboard')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup']
}
