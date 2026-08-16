import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"

import { ProfileForm } from "@/features/user-settings/components/forms/profile-form"

export const ProfileCard = () => {
	return (
		<Card className="mx-auto max-w-2xl">
			<CardHeader>
				<CardTitle>Profile Settings</CardTitle>
				<CardDescription>Manage your profile information</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<ProfileForm />
			</CardContent>
		</Card>
	)
}
