import { useCallback, useMemo, useState } from "react"

import { overlayUtils } from "./map-utils"
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

export function useUndoRedo(config: MapControlConfig) {
	const [undoStack, setUndoStack] = useState<google.maps.MVCObject[]>([])

	const canUndo = useMemo(
		() => config.undoRedoEnabled && undoStack.length > 0,
		[config.undoRedoEnabled, undoStack.length]
	)

	const canRedo = useMemo(
		() => config.undoRedoEnabled && false, // TODO: Implement redo stack
		[config.undoRedoEnabled]
	)

	const undo = useCallback(() => {
		if (!config.undoRedoEnabled || undoStack.length === 0) return null

		const lastOverlay = undoStack[undoStack.length - 1]
		if (lastOverlay) {
			overlayUtils.setOverlayMap(lastOverlay, null)
			setUndoStack((prev) => prev.slice(0, -1))
			debugLog(config, "Undo performed")
			return lastOverlay
		}
		return null
	}, [undoStack, config])

	const redo = useCallback(() => {
		if (!config.undoRedoEnabled) return null
		// TODO: Implement redo functionality
		debugLog(config, "Redo not implemented yet")
		return null
	}, [config])

	const addToUndoStack = useCallback(
		(overlay: google.maps.MVCObject) => {
			if (!config.undoRedoEnabled) return
			setUndoStack((prev) => [
				...prev.slice(-(config.maxUndoSteps ?? 10) + 1),
				overlay
			])
		},
		[config]
	)

	return { undoStack, canUndo, canRedo, undo, redo, addToUndoStack }
}
