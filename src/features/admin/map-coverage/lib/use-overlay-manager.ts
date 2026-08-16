import { useCallback, useState } from "react"

import { detectOverlay, geometryUtils, overlayUtils } from "./map-utils"
import type { ValidationError } from "./use-error-manager"
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

export function useOverlayManager(
	config: MapControlConfig,
	setError: (error: ValidationError) => void
) {
	const [overlays, setOverlays] = useState<google.maps.MVCObject[]>([])

	const addOverlay = useCallback(
		(overlay: google.maps.MVCObject) => {
			setOverlays((prev) => [...prev, overlay])
			debugLog(config, "Overlay added", {
				type: detectOverlay.getOverlayType(overlay)
			})
		},
		[config]
	)

	const deleteOverlay = useCallback(
		(overlay: google.maps.MVCObject) => {
			overlayUtils.setOverlayMap(overlay, null)
			setOverlays((prev) => prev.filter((o) => o !== overlay))
			debugLog(config, "Overlay deleted", {
				type: detectOverlay.getOverlayType(overlay)
			})
		},
		[config]
	)

	const clearAll = useCallback(() => {
		overlays.forEach((overlay) => overlayUtils.setOverlayMap(overlay, null))
		setOverlays([])
		debugLog(config, "All overlays cleared")
	}, [overlays, config])

	// Validate individual marker and remove if outside boundaries
	const validateAndCleanupSingleMarker = useCallback(
		(
			marker: google.maps.Marker,
			selectOverlay?: (overlay: google.maps.MVCObject | null) => void
		) => {
			if (!config.validateMarkerPlacement) return false

			// Check against all other overlays (excluding this marker)
			const otherOverlays = overlays.filter((o) => o !== marker)

			if (otherOverlays.length > 0) {
				const isInsideBoundary = geometryUtils.isMarkerInsideAnyShape(
					marker,
					otherOverlays
				)

				if (!isInsideBoundary) {
					// Remove the invalid marker
					deleteOverlay(marker)
					selectOverlay?.(null) // Clear selection if provided

					setError({
						type: "MARKER_OUTSIDE_BOUNDARY",
						message: "Marker removed for being outside boundaries",
						timestamp: Date.now(),
						overlay: marker
					})

					debugLog(config, "Single marker removed - outside boundary", {
						position: marker.getPosition()?.toJSON()
					})

					return true // Marker was removed
				}
			}
			return false // Marker is valid
		},
		[config, overlays, deleteOverlay, setError]
	)

	// Validate all markers and remove those outside boundaries
	const validateAndCleanupAllMarkers = useCallback(() => {
		if (!config.validateMarkerPlacement) return

		const markersToRemove: google.maps.Marker[] = []

		overlays.forEach((overlay) => {
			if (overlay instanceof google.maps.Marker) {
				// Check against all other overlays (excluding this marker)
				const otherOverlays = overlays.filter((o) => o !== overlay)

				if (otherOverlays.length > 0) {
					const isInsideBoundary = geometryUtils.isMarkerInsideAnyShape(
						overlay,
						otherOverlays
					)

					if (!isInsideBoundary) {
						markersToRemove.push(overlay)
					}
				}
			}
		})

		// Remove invalid markers and show error toast
		if (markersToRemove.length > 0) {
			markersToRemove.forEach((marker) => {
				deleteOverlay(marker)
			})

			setError({
				type: "MARKER_OUTSIDE_BOUNDARY",
				message: `${markersToRemove.length} marker${markersToRemove.length > 1 ? "s" : ""} removed for being outside boundaries`,
				timestamp: Date.now(),
				overlay: markersToRemove[0]
			})

			debugLog(config, "Markers removed outside boundaries", {
				count: markersToRemove.length
			})
		}
	}, [config, overlays, deleteOverlay, setError])

	return {
		overlays,
		addOverlay,
		deleteOverlay,
		clearAll,
		validateAndCleanupSingleMarker,
		validateAndCleanupAllMarkers
	}
}
