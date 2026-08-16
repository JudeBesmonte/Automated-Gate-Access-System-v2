"use client"

import { useCallback, useEffect, useMemo } from "react"
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps"

import { geometryUtils, overlayUtils } from "./map-utils"
import { useDrawingManager } from "./use-drawing-manager"
import { useEditMode } from "./use-edit-mode"
import { useErrorManager, type ValidationError } from "./use-error-manager"
import { useMapData } from "./use-map-data"
import { useOverlayManager } from "./use-overlay-manager"
import { useOverlaySelection } from "./use-overlay-selection"
import { useUndoRedo } from "./use-undo-redo"

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

// Re-export types for convenience
export type { ValidationError } from "./use-error-manager"
export type { OverlayInfo } from "./use-overlay-selection"

export interface ShapeData {
	id: string
	type: "marker" | "circle" | "polygon" | "rectangle" | "polyline"
	data: {
		// For markers
		position?: { lat: number; lng: number }
		// For circles
		center?: { lat: number; lng: number }
		radius?: number
		// For polygons and polylines
		path?: { lat: number; lng: number }[]
		// For rectangles
		bounds?: {
			north: number
			south: number
			east: number
			west: number
		}
	}
	metadata?: {
		createdAt: number
		visible: boolean
		editable: boolean
	}
}

export interface MapControlConfig {
	/** Whether overlays start in edit mode by default */
	defaultEditMode?: boolean
	/** Whether to validate marker placement inside boundaries */
	validateMarkerPlacement?: boolean
	/** Whether overlays are visible by default */
	overlayVisibility?: "visible" | "hidden"
	/** Whether undo/redo functionality is enabled */
	undoRedoEnabled?: boolean
	/** Maximum number of undo steps to keep */
	maxUndoSteps?: number
	/** Whether to auto-select newly created overlays */
	autoSelectNewOverlays?: boolean
	/** Enable persistence to localStorage */
	enablePersistence?: boolean
	/** Key for localStorage persistence */
	persistenceKey?: string
	/** Enable keyboard shortcuts */
	enableKeyboardShortcuts?: boolean
	/** Enable debug mode for development */
	debugMode?: boolean
	/** Callback function when shapes are saved */
	onSave?: (shapesData: ShapeData[]) => void | Promise<void>
	/** Callback function when errors occur */
	onError?: (error: ValidationError) => void
}

// Default configuration
const defaultConfig: Required<Omit<MapControlConfig, "onSave" | "onError">> & {
	onSave?: MapControlConfig["onSave"]
	onError?: MapControlConfig["onError"]
} = {
	defaultEditMode: false,
	validateMarkerPlacement: true,
	overlayVisibility: "visible",
	undoRedoEnabled: true,
	maxUndoSteps: 10,
	autoSelectNewOverlays: false,
	enablePersistence: false,
	persistenceKey: "map-control-state",
	enableKeyboardShortcuts: false,
	debugMode: false
}

// ============================================================================
// MAIN COMPOUND HOOK
// ============================================================================

export function useMapControl(userConfig?: MapControlConfig) {
	const config = useMemo(
		() => ({ ...defaultConfig, ...userConfig }),
		[userConfig]
	)

	const map = useMap()
	const geometry = useMapsLibrary("geometry")

	// Initialize compound hooks
	const drawing = useDrawingManager(config)
	const { handleError } = useErrorManager(config)
	const overlayManager = useOverlayManager(config, handleError)
	const selection = useOverlaySelection()
	const editMode = useEditMode(overlayManager.overlays, config)
	const undoRedo = useUndoRedo(config)
	const { extractMapData, saveMapData, extractShapeData, saveShapes } =
		useMapData(
			overlayManager.overlays,
			config,
			overlayManager.validateAndCleanupAllMarkers
		)

	// Enhanced functions that coordinate between hooks
	const deleteSelectedOverlay = useCallback(() => {
		const deleted = selection.deleteSelectedOverlay()
		if (deleted) {
			overlayManager.deleteOverlay(deleted)
			undoRedo.addToUndoStack(deleted)
		}
	}, [selection, overlayManager, undoRedo])

	const toggleSelectedOverlayEdit = useCallback(() => {
		const selectedOverlay = selection.selectedOverlay
		if (!selectedOverlay) return

		// Check if overlay is currently editable
		const isCurrentlyEditable =
			overlayUtils.isOverlayCurrentlyEditable(selectedOverlay)

		// If we're turning OFF edit mode for a marker, validate it first
		if (isCurrentlyEditable && selectedOverlay instanceof google.maps.Marker) {
			const wasRemoved = overlayManager.validateAndCleanupSingleMarker(
				selectedOverlay,
				selection.selectOverlay
			)
			// Don't proceed with toggle since marker was removed
			if (wasRemoved) return
		}

		// Proceed with normal toggle
		editMode.toggleSelectedOverlayEdit(selectedOverlay)
	}, [
		editMode,
		selection.selectedOverlay,
		overlayManager,
		selection.selectOverlay
	])

	// Enhanced toggle edit mode with validation
	const toggleEditModeWithValidation = useCallback(() => {
		// If currently in edit mode, validate markers before turning off edit mode
		if (editMode.isEditMode) overlayManager.validateAndCleanupAllMarkers()

		editMode.toggleEditMode()
	}, [editMode, overlayManager])

	// Batch operations
	const batchOperations = useMemo(
		() => ({
			deleteMultiple: (overlaysToDelete: google.maps.MVCObject[]) => {
				debugLog(config, "Batch delete", { count: overlaysToDelete.length })
				overlaysToDelete.forEach((overlay) =>
					overlayManager.deleteOverlay(overlay)
				)
			},

			hideMultiple: (overlaysToHide: google.maps.MVCObject[]) => {
				debugLog(config, "Batch hide", { count: overlaysToHide.length })
				overlaysToHide.forEach((overlay) => {
					if (
						overlay &&
						typeof (
							overlay as unknown as { setVisible?: (visible: boolean) => void }
						).setVisible === "function"
					) {
						;(
							overlay as unknown as { setVisible: (visible: boolean) => void }
						).setVisible(false)
					}
				})
			},

			exportToGeoJSON: () => {
				debugLog(config, "Exporting to GeoJSON")
				return { type: "FeatureCollection", features: [] }
			}
		}),
		[config, overlayManager]
	)

	const validateMarkerPlacement = useCallback(
		(marker: google.maps.Marker) => {
			return geometryUtils.isMarkerInsideAnyShape(
				marker,
				overlayManager.overlays
			)
		},
		[overlayManager.overlays]
	)

	// Add click listeners to overlay
	const addOverlayClickListener = useCallback(
		(overlay: google.maps.MVCObject) => {
			if (overlayUtils.isDraggableOverlay(overlay)) {
				overlay.addListener("click", (e: google.maps.MapMouseEvent) => {
					e?.stop?.()
					selection.selectOverlay(overlay)
				})

				overlay.addListener("dragstart", () => {
					selection.selectOverlay(null)
				})
			}
		},
		[selection]
	)

	// Coordinate overlay creation
	useEffect(() => {
		if (!drawing.drawingManager || !map || !geometry) return

		const overlayCompleteListener = drawing.drawingManager.addListener(
			"overlaycomplete",
			(event: google.maps.drawing.OverlayCompleteEvent) => {
				const overlay = event.overlay

				// Validate marker placement if enabled
				if (
					config.validateMarkerPlacement &&
					overlay instanceof google.maps.Marker
				) {
					const isInsideBoundary = geometryUtils.isMarkerInsideAnyShape(
						overlay,
						overlayManager.overlays
					)

					if (overlayManager.overlays.length > 0 && !isInsideBoundary) {
						overlay.setMap(null)
						handleError({
							type: "MARKER_OUTSIDE_BOUNDARY",
							message: "Marker must be placed inside existing boundaries",
							timestamp: Date.now(),
							overlay
						})
						return
					}
				}

				// Apply visibility settings
				if (config.overlayVisibility === "hidden") {
					overlay.setVisible(false)
				}

				// Apply edit mode if enabled
				if (editMode.isEditMode) {
					overlayUtils.updateOverlayEditability(overlay, true)
				}

				addOverlayClickListener(overlay)
				overlayManager.addOverlay(overlay)

				// Reset drawing mode after overlay is completed
				drawing.setDrawingMode(null)

				// Auto-select if configured
				if (config.autoSelectNewOverlays) {
					selection.selectOverlay(overlay)
				}
			}
		)

		const mapClickListener = map.addListener("click", () =>
			selection.selectOverlay(null)
		)

		return () => {
			google.maps.event.removeListener(overlayCompleteListener)
			google.maps.event.removeListener(mapClickListener)
		}
	}, [
		drawing,
		map,
		geometry,
		config.validateMarkerPlacement,
		config.overlayVisibility,
		config.autoSelectNewOverlays,
		editMode.isEditMode,
		overlayManager.overlays,
		overlayManager.addOverlay,
		selection.selectOverlay,
		handleError,
		addOverlayClickListener,
		overlayManager,
		selection
	])

	return {
		// Data object containing all state/information (TanStack Query style)
		data: {
			// Drawing state
			currentDrawingMode: drawing.currentDrawingMode,
			drawingManager: drawing.drawingManager,

			// Overlay data
			overlays: overlayManager.overlays,
			overlayCount: overlayManager.overlays.length,
			mapData: extractMapData(),
			shapesData: extractShapeData(), // Legacy alias

			// Selection data
			selectedOverlay: selection.selectedOverlay,
			selectedOverlayCenter: selection.selectedOverlayCenter,
			selectedOverlayInfo: selection.selectedOverlayInfo,

			// Edit mode state
			isEditMode: editMode.isEditMode,

			// Undo/Redo state
			undoStack: undoRedo.undoStack,
			canUndo: undoRedo.canUndo,
			canRedo: undoRedo.canRedo
		},

		// Action methods
		setDrawingMode: drawing.setDrawingMode,
		clearAll: overlayManager.clearAll,
		selectOverlay: selection.selectOverlay,
		deleteSelectedOverlay,
		toggleSelectedOverlayEdit,
		toggleEditMode: toggleEditModeWithValidation,
		undo: undoRedo.undo,
		redo: undoRedo.redo,
		saveMapData,
		saveShapes, // Legacy alias
		validateMarkerPlacement,
		batchOperations
	}
}
