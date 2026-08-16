"use client"

import { useState } from "react"
import { type SubscriptionStatus } from "@prisma/client"
import { Calendar } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/core/components/ui/button"
import { Calendar as CalendarPicker } from "@/core/components/ui/calendar"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/core/components/ui/dialog"
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/core/components/ui/popover"
import { Textarea } from "@/core/components/ui/textarea"
import { Label } from "@/core/components/ui/label"
import { cn } from "@/core/lib/utils"

import { useScheduleInstallation } from "@/features/admin/plans/lib/hooks"

interface ScheduleInstallationModalProps {
	id: string
	currentStatus: SubscriptionStatus
	customerName: string
	planName: string
}

export const ScheduleInstallationModal = ({
	id,
	currentStatus,
	customerName,
	planName
}: ScheduleInstallationModalProps) => {
	const [open, setOpen] = useState(false)
	const [installationDate, setInstallationDate] = useState<Date>()
	const [notes, setNotes] = useState("")

	const { mutate: scheduleInstallation, isPending } = useScheduleInstallation()

	const handleSchedule = () => {
		if (!installationDate) return

		scheduleInstallation(
			{
				id,
				installationDate: installationDate.toISOString(),
				notes: notes.trim() || undefined
			},
			{
				onSuccess: () => {
					setOpen(false)
					setInstallationDate(undefined)
					setNotes("")
				}
			}
		)
	}

	const isValidDate = installationDate && installationDate > new Date()
	const isScheduleDisabled = !isValidDate || isPending

	if (currentStatus === "FOR_INSTALLATION") {
		return null // Already scheduled
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="w-full justify-start px-2 py-1.5 h-auto font-normal"
					disabled={isPending}
				>
					<Calendar className="mr-2 h-4 w-4" />
					Schedule Installation
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-md" onInteractOutside={(e) => e.preventDefault()}>
				<DialogHeader>
					<DialogTitle>Schedule Installation</DialogTitle>
					<DialogDescription>
						Set the installation date for {customerName}'s {planName} subscription.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="installation-date">Installation Date</Label>
						<Popover modal={true}>
							<PopoverTrigger asChild>
								<Button
									id="installation-date"
									variant="outline"
									className={cn(
										"w-full justify-start text-left font-normal",
										!installationDate && "text-muted-foreground"
									)}
								>
									<Calendar className="mr-2 h-4 w-4" />
									{installationDate ? (
										format(installationDate, "PPP")
									) : (
										<span>Pick installation date</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent 
								className="w-auto p-0" 
								align="start"
								onInteractOutside={(e) => e.preventDefault()}
							>
								<CalendarPicker
									mode="single"
									selected={installationDate}
									onSelect={(date) => {
										setInstallationDate(date)
									}}
									disabled={(date) => {
										const today = new Date()
										today.setHours(0, 0, 0, 0)
										return date < today
									}}
									initialFocus
									fromDate={new Date()}
								/>
							</PopoverContent>
						</Popover>
					</div>

					<div className="space-y-2">
						<Label htmlFor="installation-notes">
							Installation Notes{" "}
							<span className="text-xs text-muted-foreground">(Optional)</span>
						</Label>
						<Textarea
							id="installation-notes"
							placeholder="Any special instructions or notes for the installation team..."
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
							rows={3}
						/>
					</div>
				</div>

				<div className="flex justify-end space-x-2">
					<Button
						variant="outline"
						onClick={() => setOpen(false)}
						disabled={isPending}
					>
						Cancel
					</Button>
					<Button
						onClick={handleSchedule}
						disabled={isScheduleDisabled}
						className="bg-primary"
					>
						{isPending ? "Scheduling..." : "Schedule Installation"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
} 