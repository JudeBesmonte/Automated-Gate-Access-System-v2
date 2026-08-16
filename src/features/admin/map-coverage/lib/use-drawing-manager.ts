import { useCallback, useEffect, useState } from "react"
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps"

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

export function useDrawingManager(config: MapControlConfig) {
	const map = useMap()
	const drawing = useMapsLibrary("drawing")
	const [drawingManager, setDrawingManager] =
		useState<google.maps.drawing.DrawingManager | null>(null)
	const [currentDrawingMode, setCurrentDrawingMode] =
		useState<google.maps.drawing.OverlayType | null>(null)

	const setDrawingMode = useCallback(
		(mode: google.maps.drawing.OverlayType | null) => {
			if (drawingManager) {
				drawingManager.setDrawingMode(mode)
				setCurrentDrawingMode(mode)
				debugLog(config, "Drawing mode changed", { mode })
			}
		},
		[drawingManager, config]
	)

	// Initialize drawing manager
	useEffect(() => {
		if (typeof window === "undefined" || !map || !drawing) return

		const newDrawingManager = new drawing.DrawingManager({
			map,
			drawingMode: null,
			drawingControl: false
		})

		setDrawingManager(newDrawingManager)
		debugLog(config, "Drawing manager initialized")

		return () => {
			newDrawingManager.setMap(null)
			debugLog(config, "Drawing manager destroyed")
		}
	}, [drawing, map, config])

	return { drawingManager, setDrawingMode, currentDrawingMode }
}
