"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/ui/card"
import { SidebarLayout } from "@/core/components/layouts/clientSidebarLayout"
import { AccountForm } from "@/features/user-settings/components/forms/account-form"

export default function AccountPage() {
  return (
    <main className="container mx-auto px-6">
      <SidebarLayout showSidebar={true}>
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage your account credentials
              </p>
            </CardHeader>
            <CardContent>
              <AccountForm />
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </main>
  )
}
