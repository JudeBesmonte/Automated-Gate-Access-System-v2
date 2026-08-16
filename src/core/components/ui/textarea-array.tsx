"use client"

import { type TextareaHTMLAttributes } from "react"

import { cn } from "@/core/lib/utils"

import { Textarea } from "./textarea"

export interface TextareaArrayProps
	extends Omit<
		TextareaHTMLAttributes<HTMLTextAreaElement>,
		"value" | "onChange"
	> {
	value?: string[]
	onChange?: (value: string[]) => void
}

export function TextareaArray({
	className,
	value = [],
	onChange,
	...props
}: TextareaArrayProps) {
	return (
		<Textarea
			className={cn("min-h-[80px]", className)}
			value={Array.isArray(value) ? value.join("\n") : value}
			onChange={(e) => {
				const inputValue = e.target.value
				if (inputValue === "") {
					onChange?.([])
					return
				}
				onChange?.(inputValue.split("\n"))
			}}
			onBlur={(e) => {
				const inputValue = e.target.value
				const arrayValue = inputValue
					.split("\n")
					.map((line) => line.trim())
					.filter(Boolean)
				onChange?.(arrayValue)
			}}
			{...props}
		/>
	)
}
