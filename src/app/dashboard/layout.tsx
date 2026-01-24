import { getCurrentUser } from "@/actions/auth"
import { UserProvider } from "@/contexts/user-context"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get user data (proxy.ts already handles auth redirect)
  const user = await getCurrentUser()

  return (
    <UserProvider user={user}>
      <div className="min-h-screen">
        {children}
      </div>
    </UserProvider>
  )
}
