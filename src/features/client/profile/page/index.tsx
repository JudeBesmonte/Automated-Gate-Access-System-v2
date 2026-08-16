"use client"

import { ProfileForm } from "@/features/user-settings/components/forms/profile-form"

export default function ClientProfilePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile information
        </p>
      </div>
      <ProfileForm />
    </div>
  )
}
