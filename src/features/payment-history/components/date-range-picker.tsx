// src/core/components/ui/date-picker-with-range.tsx (or your preferred path)
"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
// Renamed to avoid confusion with our [Date | null, Date | null] tuple
import type { DateRange as ReactDayPickerDateRange } from "react-day-picker"

import { Button } from "@/core/components/ui/button"
import { Calendar } from "@/core/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/core/components/ui/popover"
import { cn } from "@/core/lib/utils"

// Define the props for the component
interface DatePickerWithRangeProps {
	className?: string // className is fine from HTMLAttributes
	// id?: string; // id is also fine if you need it
	value?: [Date | null, Date | null]
	onDateChange?: (dateRange: [Date | null, Date | null] | undefined) => void // Renamed from onChange
	placeholder?: string
}

export function DatePickerWithRange({
	className,
	value,
	onDateChange, // Use the new prop name
	placeholder = "Pick a date range"
}: DatePickerWithRangeProps) {
	// Convert our [Date | null, Date | null] value to react-day-picker's DateRange format
	const selectedDateRange: ReactDayPickerDateRange | undefined =
		React.useMemo(() => {
			if (value && (value[0] || value[1])) {
				return { from: value[0] ?? undefined, to: value[1] ?? undefined }
			}
			return undefined
		}, [value])

	const handleSelect = (range: ReactDayPickerDateRange | undefined) => {
		if (onDateChange) {
			// Use the new prop name
			if (range) {
				// Convert back to [Date | null, Date | null] for nuqs
				onDateChange([range.from ?? null, range.to ?? null])
			} else {
				// If range is undefined (e.g., cleared), pass [null, null]
				onDateChange([null, null])
			}
		}
	}

	return (
		<div className={cn("grid gap-2", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date-range-picker" // It's good practice to have a unique id if needed
						variant={"outline"}
						className={cn(
							"w-full min-w-[260px] justify-start text-left font-normal",
							!selectedDateRange?.from && "text-muted-foreground"
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{selectedDateRange?.from ? (
							selectedDateRange.to ? (
								<>
									{format(selectedDateRange.from, "LLL dd, y")} -{" "}
									{format(selectedDateRange.to, "LLL dd, y")}
								</>
							) : (
								format(selectedDateRange.from, "LLL dd, y")
							)
						) : (
							<span>{placeholder}</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={selectedDateRange?.from}
						selected={selectedDateRange}
						onSelect={handleSelect}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}
