import { useCallback, useMemo, useState } from "react"

import { overlayUtils, positionUtils } from "./map-utils"

export interface OverlayInfo {
	type: string
	isEditing: boolean
	canEdit: boolean
}

export function useOverlaySelection() {
	const [selectedOverlay, setSelectedOverlay] =
		useState<google.maps.MVCObject | null>(null)

	const selectedOverlayCenter = useMemo(
		() =>
			selectedOverlay
				? positionUtils.getOverlayPosition(selectedOverlay)
				: null,
		[selectedOverlay]
	)

	const selectedOverlayInfo = useMemo(
		() => overlayUtils.getOverlayInfo(selectedOverlay),
		[selectedOverlay]
	)

	const selectOverlay = useCallback((overlay: google.maps.MVCObject | null) => {
		setSelectedOverlay(overlay)
	}, [])

	const deleteSelectedOverlay = useCallback(() => {
		if (selectedOverlay) {
			overlayUtils.setOverlayMap(selectedOverlay, null)
			setSelectedOverlay(null)
			return selectedOverlay
		}
		return null
	}, [selectedOverlay])

	return {
		selectedOverlay,
		selectedOverlayCenter,
		selectedOverlayInfo,
		selectOverlay,
		deleteSelectedOverlay
	}
}
