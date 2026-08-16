"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/core/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/core/components/ui/form"
import { Input } from "@/core/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/core/components/ui/select"
import { Switch } from "@/core/components/ui/switch"
import { TextareaArray } from "@/core/components/ui/textarea-array"
import { LoadingIcon } from "@/core/lib/icons"

import { useUpdatePlan } from "@/features/admin/plans/lib/hooks"
import {
	updatePlanSchema,
	type UpdatePlanSchema
} from "@/features/admin/plans/server/validations"

interface UpdatePlanFormProps {
	onSuccess?: () => void
	defaultValues: UpdatePlanSchema
}

export const UpdatePlanForm = ({
	onSuccess,
	defaultValues
}: UpdatePlanFormProps) => {
	const { mutate, isPending } = useUpdatePlan()

	const form = useForm({
		resolver: zodResolver(updatePlanSchema),
		defaultValues
	})

	const onSubmit = (values: UpdatePlanSchema) => {
		mutate(values, {
			onSuccess: () => {
				form.reset()
				onSuccess?.()
			}
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Plan Name</FormLabel>
								<FormControl>
									<Input
										placeholder="e.g. Basic, Premium, Enterprise"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="slug"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Slug</FormLabel>
								<FormControl>
									<Input placeholder="e.g. basic-plan" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="planType"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Plan Type</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a plan type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="EDUCATION">Education</SelectItem>
										<SelectItem value="GOVERNMENT">Government</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="monthlyPrice"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Monthly Price</FormLabel>
								<FormControl>
									<div className="relative">
										<span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
											₱
										</span>
										<Input
											type="number"
											inputMode="numeric"
											pattern="[0-9]*\.?[0-9]*"
											className="pl-8"
											{...field}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="hasKiosk"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center justify-between gap-2 rounded-lg border border-input p-3 shadow-sm">
									<div className="space-y-0.5">
										<FormLabel>Has Kiosk</FormLabel>
										<FormDescription>
											Enable kiosk feature for this plan
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="isActive"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center justify-between gap-2 rounded-lg border border-input p-3 shadow-sm">
									<div className="space-y-0.5">
										<FormLabel>Active Plan</FormLabel>
										<FormDescription>
											Make this plan available for subscription
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="features"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Features</FormLabel>
							<FormControl>
								<TextareaArray
									placeholder="Enter features, one per line"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="inclusions"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Inclusions</FormLabel>
							<FormControl>
								<TextareaArray
									placeholder="Enter inclusions, one per line"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="addons"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Addons</FormLabel>
							<FormControl>
								<TextareaArray
									placeholder="Enter addons, one per line"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="equipment"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Equipment</FormLabel>
							<FormControl>
								<TextareaArray
									placeholder="Enter equipment, one per line"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-end gap-3">
					<Button
						type="button"
						variant="outline"
						onClick={() => {
							form.reset()
							onSuccess?.()
						}}
					>
						Cancel
					</Button>
					<Button type="submit" disabled={isPending}>
						{isPending && <LoadingIcon className="animate-spin" />}
						{isPending ? "Loading..." : "Update Plan"}
					</Button>
				</div>
			</form>
		</Form>
	)
}
