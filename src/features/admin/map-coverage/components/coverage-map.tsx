"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"
import { ControlPosition, Map, MapControl } from "@vis.gl/react-google-maps"
import { toast } from "sonner"

import { Skeleton } from "@/core/components/ui/skeleton"

import { DrawingControls } from "@/features/admin/map-coverage/components/drawing-controls"
import { SelectedOverlayInfo } from "@/features/admin/map-coverage/components/selected-overlay-info"
import {
	useMapControl,
	type ShapeData,
	type ValidationError
} from "@/features/admin/map-coverage/lib/use-map-control"

const MAP_CONFIG = {
	defaultZoom: 14,
	defaultCenter: { lat: 13.145947, lng: 123.749353 },
	minZoom: 2,
	maxZoom: 20,
	restriction: {
		latLngBounds: { north: 85, south: -85, west: -180, east: 180 }
	}
} as const

const CoverageMapComponent = () => {
	const mapControlConfig = useMemo(
		() => ({
			defaultEditMode: false,
			validateMarkerPlacement: true,
			overlayVisibility: "visible" as const,
			undoRedoEnabled: true,
			maxUndoSteps: 10,
			autoSelectNewOverlays: false,
			onSave: async (shapesData: ShapeData[]) => {
				// This is where you can save to your database
				console.log("Saving shapes to database:", shapesData)
				// Example: await saveShapesToDatabase(shapesData)
				toast.success(`Saved ${shapesData.length} shapes successfully!`)
			},
			onError: (error: ValidationError) => {
				// This is where you can handle errors consistently
				console.error("Map error occurred:", error)
				toast.error(error.message)
				// Example: reportErrorToService(error)
			}
		}),
		[]
	)

	const {
		data: {
			currentDrawingMode,
			canUndo,
			canRedo,
			isEditMode,
			selectedOverlay,
			selectedOverlayCenter,
			selectedOverlayInfo,
			overlayCount
		},
		setDrawingMode,
		undo,
		redo,
		clearAll,
		saveShapes,
		toggleEditMode,
		deleteSelectedOverlay,
		toggleSelectedOverlayEdit,
		selectOverlay
	} = useMapControl(mapControlConfig)

	return (
		<>
			<Map
				mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID ?? ""}
				className="h-[600px] w-full overflow-hidden rounded-md text-black"
				defaultCenter={{
					lat: MAP_CONFIG.defaultCenter.lat,
					lng: MAP_CONFIG.defaultCenter.lng
				}}
				defaultZoom={MAP_CONFIG.defaultZoom}
				clickableIcons={false}
				disableDefaultUI
				fullscreenControl
				gestureHandling="greedy"
				restriction={MAP_CONFIG.restriction}
				minZoom={MAP_CONFIG.minZoom}
				maxZoom={MAP_CONFIG.maxZoom}
				zoomControl
				zoomControlOptions={{ position: 3 }}
			/>

			<MapControl position={ControlPosition.BOTTOM}>
				<DrawingControls
					currentDrawingMode={currentDrawingMode}
					setDrawingMode={setDrawingMode}
					canUndo={canUndo ?? false}
					canRedo={canRedo ?? false}
					isEditMode={isEditMode ?? false}
					onUndo={undo}
					onRedo={redo}
					onClearAll={clearAll}
					onSave={saveShapes}
					onToggleEditMode={toggleEditMode}
					overlayCount={overlayCount}
				/>
			</MapControl>

			<SelectedOverlayInfo
				selectedOverlay={selectedOverlay}
				selectedOverlayCenter={selectedOverlayCenter}
				selectedOverlayInfo={selectedOverlayInfo}
				onDeleteSelected={deleteSelectedOverlay}
				onToggleSelectedEdit={toggleSelectedOverlayEdit}
				onClose={() => selectOverlay(null)}
			/>
		</>
	)
}

export const CoverageMap = dynamic(
	() => Promise.resolve(CoverageMapComponent),
	{
		ssr: false,
		loading: () => <Skeleton className="h-[600px] w-full bg-secondary" />
	}
)
