'use client'

import { Sidebar } from '@/components/organisms/Sidebar'

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header - for future mobile sidebar */}
        <div className="flex h-16 items-center border-b px-4 md:hidden">
          <h1 className="text-lg font-semibold">Portfolio Dashboard</h1>
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}