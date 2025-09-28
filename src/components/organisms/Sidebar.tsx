'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, LayoutDashboard, FolderOpen, Briefcase, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { SidebarItem } from '@/components/molecules/SidebarItem'
import { useUI } from '@/lib/ui-store'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { cn } from '@/lib/utils'

const menuItems = [
  {
    icon: LayoutDashboard,
    label: 'Overview',
    href: '/dashboard',
  },
  {
    icon: FolderOpen,
    label: 'Projects',
    href: '/dashboard/projects',
  },
  {
    icon: Briefcase,
    label: 'Experiences',
    href: '/dashboard/experiences',
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/dashboard/settings',
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const { sidebarCollapsed, toggleSidebar } = useUI()
  const { user, logout } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Prevent hydration issues with persisted state
    return (
      <div className={cn("flex h-full w-64 flex-col border-r bg-background", className)}>
        <div className="p-4">
          <div className="h-8 bg-muted animate-pulse rounded" />
        </div>
      </div>
    )
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      // Error is already handled in the store
    }
  }

  return (
    <div className={cn(
      "flex h-full flex-col border-r bg-background transition-all duration-200",
      sidebarCollapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="flex h-16 items-center border-b px-4">
        {!sidebarCollapsed && (
          <h2 className="text-lg font-semibold">Portfolio</h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className={cn(
            "ml-auto h-8 w-8 p-0",
            sidebarCollapsed && "mx-auto"
          )}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              sidebarCollapsed && "rotate-180"
            )}
          />
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isCollapsed={sidebarCollapsed}
          />
        ))}
      </div>

      {/* User Section */}
      <div className="border-t p-4">
        {!sidebarCollapsed && user && (
          <div className="mb-3 flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate text-sm">
              <p className="font-medium truncate">{user.username}</p>
              <p className="text-muted-foreground text-xs truncate">{user.email}</p>
            </div>
          </div>
        )}
        
        {sidebarCollapsed && user && (
          <div className="mb-3 flex justify-center">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
        
        <Separator className="mb-3" />
        
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full gap-2",
            sidebarCollapsed && "px-2"
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!sidebarCollapsed && <span>Sign Out</span>}
        </Button>
      </div>
    </div>
  )
}