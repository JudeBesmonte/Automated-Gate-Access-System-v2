"use client"

import { AccountForm } from "@/features/user-settings/components/forms/account-form"

export default function ClientAccountPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account credentials
        </p>
      </div>
      <AccountForm />
    </div>
  )
}
