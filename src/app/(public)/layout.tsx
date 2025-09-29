import { FloatingNavbar, StaticNavbar } from '@/components/ui/floating-navbar'

export const metadata = {
  title: 'Portfolio - Professional Experiences & Projects',
  description: 'Explore professional experiences, projects, and technical expertise',
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Static Navigation */}
      <StaticNavbar />
      
      {/* Floating Navigation (appears on scroll) */}
      <FloatingNavbar />
      
      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  )
}