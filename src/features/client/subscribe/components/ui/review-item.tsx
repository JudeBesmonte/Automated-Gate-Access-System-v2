// ReviewItem.tsx
import React from "react"

export function ReviewItem({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className="space-y-4" {...props} />
}

function ReviewItemTitle({
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return <h3 className="text-base font-semibold" {...props} />
}

function ReviewItemContent({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className="grid grid-cols-2 gap-4" {...props} />
}

function ReviewField({
	label,
	value,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	label: string
	value?: string
}) {
	return (
		<div className="flex flex-1 flex-col gap-1" {...props}>
			<h4 className="text-sm font-semibold">{label}</h4>
			<p className="text-sm">{value ?? "-"}</p>
		</div>
	)
}

ReviewItem.Title = ReviewItemTitle
ReviewItem.Content = ReviewItemContent
ReviewItem.Field = ReviewField
