'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  href: string
  isCollapsed?: boolean
}

export function SidebarItem({ icon: Icon, label, href, isCollapsed }: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      className={cn(
        "w-full justify-start gap-2",
        isCollapsed && "px-2",
        isActive && "bg-primary text-primary-foreground"
      )}
      asChild
    >
      <Link href={href}>
        <Icon className="h-4 w-4 shrink-0" />
        {!isCollapsed && (
          <span className="truncate">{label}</span>
        )}
      </Link>
    </Button>
  )
}