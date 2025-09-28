'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardShell } from '@/components/templates/DashboardShell'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, status, refreshMe } = useAuth()
  const router = useRouter()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    let isMounted = true

    const initialize = async () => {
      if (status === 'idle') {
        await refreshMe()
      }
      if (isMounted) {
        setIsInitialized(true)
      }
    }

    initialize()

    return () => {
      isMounted = false
    }
  }, [status, refreshMe])

  useEffect(() => {
    if (isInitialized && status === 'unauthenticated') {
      router.push('/login')
    }
  }, [isInitialized, status, router])

  // Show loading skeleton while checking auth
  if (!isInitialized || status === 'loading' || status === 'idle') {
    return (
      <div className="flex h-screen">
        <div className="hidden md:flex w-64 border-r bg-background">
          <div className="flex flex-col w-full p-4 space-y-4">
            <Skeleton className="h-8 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
        <div className="flex-1 p-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show nothing while redirecting to login
  if (status === 'unauthenticated') {
    return null
  }

  // User is authenticated, show dashboard
  return (
    <DashboardShell>
      {children}
    </DashboardShell>
  )
}