"use client"

import { useMapsLibrary } from "@vis.gl/react-google-maps"
import {
	Circle,
	Edit,
	Hand,
	MapPin,
	Pentagon as PolygonIcon,
	Redo,
	Save,
	Square,
	Trash2,
	Undo
} from "lucide-react"

import { Button } from "@/core/components/ui/button"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from "@/core/components/ui/tooltip"
import { cn } from "@/core/lib/utils"

interface DrawingControlProps {
	currentDrawingMode: google.maps.drawing.OverlayType | null
	setDrawingMode: (mode: google.maps.drawing.OverlayType | null) => void
	canUndo: boolean
	canRedo: boolean
	isEditMode: boolean
	onUndo: () => void
	onRedo: () => void
	onClearAll: () => void
	onSave: () => void
	onToggleEditMode: () => void
	overlayCount: number
	className?: string
}

export const DrawingControls = ({
	currentDrawingMode,
	setDrawingMode,
	canUndo,
	canRedo,
	isEditMode,
	onUndo,
	onRedo,
	onClearAll,
	onSave,
	onToggleEditMode,
	overlayCount,
	className
}: DrawingControlProps) => {
	const drawing = useMapsLibrary("drawing")

	if (!drawing) return null

	const drawingModes = [
		{
			mode: null,
			icon: Hand,
			title: "Pan",
			label: "Pan"
		},
		{
			mode: drawing.OverlayType.MARKER,
			icon: MapPin,
			title: "Place a marker",
			label: "Marker"
		},
		{
			mode: drawing.OverlayType.CIRCLE,
			icon: Circle,
			title: "Draw a circle",
			label: "Circle"
		},
		{
			mode: drawing.OverlayType.POLYGON,
			icon: PolygonIcon,
			title: "Draw a polygon",
			label: "Polygon"
		},
		// {
		// 	mode: drawing.OverlayType.POLYLINE,
		// 	icon: Minus,
		// 	title: "Draw a line",
		// 	label: "Line"
		// },
		{
			mode: drawing.OverlayType.RECTANGLE,
			icon: Square,
			title: "Draw a rectangle",
			label: "Rectangle"
		}
	]

	const actionControls = [
		{
			action: onToggleEditMode,
			disabled: overlayCount === 0,
			icon: Edit,
			title: isEditMode ? "Disable edit mode" : "Enable edit mode",
			label: "Edit",
			isActive: isEditMode
		},
		{
			action: onUndo,
			disabled: !canUndo,
			icon: Undo,
			title: "Undo last action",
			label: "Undo"
		},
		{
			action: onRedo,
			disabled: !canRedo,
			icon: Redo,
			title: "Redo last action",
			label: "Redo"
		},
		{
			action: onClearAll,
			disabled: overlayCount === 0,
			icon: Trash2,
			title: "Clear all drawings",
			label: "Clear All"
		},
		{
			action: onSave,
			disabled: overlayCount === 0,
			icon: Save,
			title: "Save all shapes",
			label: "Save"
		}
	]

	return (
		<div
			className={cn(
				"mb-6 flex flex-wrap items-center justify-center gap-2 md:mb-3",
				className
			)}
		>
			{/* Drawing Mode Controls */}
			<div className="flex gap-1 rounded-lg border border-border bg-background p-1 shadow-lg">
				{drawingModes.map(({ mode, icon: Icon, title, label }) => (
					<Tooltip key={mode ?? "pan"}>
						<TooltipTrigger asChild>
							<Button
								variant={currentDrawingMode === mode ? "default" : "ghost"}
								size="sm"
								onClick={() => setDrawingMode(mode)}
								className={cn(
									"size-8 text-muted-foreground",
									currentDrawingMode === mode &&
										"bg-primary text-primary-foreground"
								)}
							>
								<Icon className="size-6 shrink-0" />
								<span className="sr-only">{label}</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent
							sideOffset={8}
							className="bg-background font-semibold text-foreground"
						>
							{title}
						</TooltipContent>
					</Tooltip>
				))}
			</div>

			{/* Action Controls */}
			<div className="flex gap-1 rounded-lg border border-border bg-background p-1 shadow-lg">
				{actionControls.map(
					({ action, disabled, icon: Icon, title, label, isActive }) => (
						<Tooltip key={label}>
							<TooltipTrigger asChild>
								<Button
									variant={isActive ? "default" : "ghost"}
									size="sm"
									onClick={action}
									disabled={disabled}
									className={cn(
										"size-8 text-muted-foreground",
										disabled && "cursor-not-allowed opacity-50",
										isActive && "bg-primary text-primary-foreground"
									)}
								>
									<Icon className="size-4 shrink-0" />
									<span className="sr-only">{label}</span>
								</Button>
							</TooltipTrigger>
							<TooltipContent
								sideOffset={8}
								className="bg-background font-semibold text-foreground"
							>
								{title}
							</TooltipContent>
						</Tooltip>
					)
				)}

				{overlayCount > 0 && (
					<div className="flex items-center px-2 text-xs text-muted-foreground">
						{overlayCount} boundar{overlayCount !== 1 ? "ies" : "y"}
					</div>
				)}
			</div>
		</div>
	)
}
