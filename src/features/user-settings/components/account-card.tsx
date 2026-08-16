import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"

import { AccountForm } from "@/features/user-settings/components/forms/account-form"

export const AccountCard = () => {
	return (
		<Card className="mx-auto max-w-2xl">
			<CardHeader>
				<CardTitle>Account Settings</CardTitle>
				<CardDescription>Manage your account information</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<AccountForm />
			</CardContent>
		</Card>
	)
}
