import { useCallback, useState } from "react"

import { detectOverlay, overlayUtils } from "./map-utils"
import type { MapControlConfig } from "./use-map-control"

// Debug utilities
const debugLog = (
	config: MapControlConfig,
	message: string,
	data?: unknown
) => {
	if (config.debugMode) {
		console.log(`[MapControl] ${message}`, data)
	}
}

export function useEditMode(
	overlays: google.maps.MVCObject[],
	config: MapControlConfig
) {
	const [isEditMode, setIsEditMode] = useState(config.defaultEditMode)

	const toggleEditMode = useCallback(() => {
		const newEditMode = !isEditMode
		overlays.forEach((overlay) =>
			overlayUtils.updateOverlayEditability(overlay, newEditMode)
		)
		setIsEditMode(newEditMode)
		debugLog(config, "Edit mode toggled", { isEditMode: newEditMode })
	}, [isEditMode, overlays, config])

	const toggleSelectedOverlayEdit = useCallback(
		(selectedOverlay: google.maps.MVCObject | null) => {
			if (!selectedOverlay) return

			const isCurrentlyEditable =
				overlayUtils.isOverlayCurrentlyEditable(selectedOverlay)
			overlayUtils.updateOverlayEditability(
				selectedOverlay,
				!isCurrentlyEditable
			)
			debugLog(config, "Overlay edit toggled", {
				type: detectOverlay.getOverlayType(selectedOverlay),
				nowEditable: !isCurrentlyEditable
			})
		},
		[config]
	)

	return { isEditMode, toggleEditMode, toggleSelectedOverlayEdit }
}
