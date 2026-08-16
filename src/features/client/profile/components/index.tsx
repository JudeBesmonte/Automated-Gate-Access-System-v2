"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/ui/card"
import { SidebarLayout } from "@/core/components/layouts/clientSidebarLayout"
import { ProfileForm } from "@/features/user-settings/components/forms/profile-form"

export default function ProfilePage() {
  return (
    <main className="container mx-auto px-6">
      <SidebarLayout showSidebar={true}>
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage your profile information
              </p>
            </CardHeader>
            <CardContent>
              <ProfileForm />
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </main>
  )
}
