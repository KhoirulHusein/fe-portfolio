'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <div className="p-2 bg-muted rounded text-sm text-muted-foreground">
                    Coming soon...
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="p-2 bg-muted rounded text-sm text-muted-foreground">
                    Coming soon...
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex justify-end">
              <Button disabled>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Password</label>
                <div className="p-2 bg-muted rounded text-sm text-muted-foreground">
                  Coming soon...
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <div className="p-2 bg-muted rounded text-sm text-muted-foreground">
                  Coming soon...
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex justify-end">
              <Button disabled>Update Password</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}