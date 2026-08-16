"use client"

import { InfoWindow } from "@vis.gl/react-google-maps"
import { Edit, Save, Trash2 } from "lucide-react"

import { Button } from "@/core/components/ui/button"

import type { OverlayInfo } from "@/features/admin/map-coverage/lib/use-overlay-selection"

interface SelectedOverlayInfoProps {
	selectedOverlay: google.maps.MVCObject | null
	selectedOverlayCenter: google.maps.LatLng | null
	selectedOverlayInfo: OverlayInfo | null
	onDeleteSelected: () => void
	onToggleSelectedEdit: () => void
	onClose: () => void
}

export const SelectedOverlayInfo = ({
	selectedOverlay,
	selectedOverlayCenter,
	selectedOverlayInfo,
	onDeleteSelected,
	onToggleSelectedEdit,
	onClose
}: SelectedOverlayInfoProps) => {
	if (!selectedOverlay || !selectedOverlayCenter || !selectedOverlayInfo) {
		return null
	}

	const handleEditToggle = () => {
		onToggleSelectedEdit()
		onClose()
	}

	const handleDelete = () => {
		onDeleteSelected()
		onClose()
	}

	const { type, isEditing, canEdit } = selectedOverlayInfo

	return (
		<InfoWindow position={selectedOverlayCenter} headerDisabled>
			<div className="space-y-3">
				<header className="text-base font-medium text-gray-900">
					Selected {type}
				</header>

				<div className="flex gap-2">
					{canEdit && (
						<Button
							variant="outline"
							size="sm"
							onClick={handleEditToggle}
							className="flex items-center gap-1.5 text-xs"
							aria-label={isEditing ? "Save changes" : "Edit overlay"}
						>
							{isEditing ? (
								<>
									<Save className="size-3" aria-hidden="true" />
									Save
								</>
							) : (
								<>
									<Edit className="size-3" aria-hidden="true" />
									Edit
								</>
							)}
						</Button>
					)}

					<Button
						variant="destructive"
						size="sm"
						onClick={handleDelete}
						className="flex items-center gap-1.5 text-xs"
						aria-label={`Delete ${type.toLowerCase()}`}
					>
						<Trash2 className="size-3" aria-hidden="true" />
						Delete
					</Button>
				</div>
			</div>
		</InfoWindow>
	)
}
