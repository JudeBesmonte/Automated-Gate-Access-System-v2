"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { APIProvider, Map } from "@vis.gl/react-google-maps"
import { useForm } from "react-hook-form"

import { Button } from "@/core/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/core/components/ui/form"
import { Input } from "@/core/components/ui/input"
import { Textarea } from "@/core/components/ui/textarea"

import {
	locationSchema,
	type LocationFormData,
	type MapClickEvent
} from "../_lib/types"
import { useMapLocation } from "../_lib/use-map-location"
import { CustomMarker } from "./custom-marker"

export const MapsPlaygroundComponent = () => {
	const form = useForm<LocationFormData>({
		resolver: zodResolver(locationSchema),
		defaultValues: {
			name: "",
			country: "",
			region: "",
			state: "",
			city: "",
			barangay: "",
			postalCode: "",
			description: "",
			longitude: 0,
			latitude: 0
		}
	})

	const { selectedLocation, handleLocationUpdate, clearLocation } =
		useMapLocation({ form })

	const handleMapClick = async (ev: MapClickEvent) => {
		if (ev.detail?.latLng) await handleLocationUpdate(ev.detail.latLng)
	}

	const onSubmit = (data: LocationFormData) => {
		console.log("Form data:", data)
		// Handle form submission here
	}

	return (
		<div className="grid h-[600px] grid-cols-1 gap-6 lg:grid-cols-2">
			{/* Map Section */}
			<Card className="flex flex-col">
				<CardHeader>
					<CardTitle>Interactive Map</CardTitle>
					<CardDescription>
						Double-click on the map to place a marker and auto-populate the
						form. Click on the marker to view location details in an info
						window.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-1 p-0">
					<div className="h-full w-full overflow-hidden rounded-b-lg">
						<APIProvider
							apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
						>
							<Map
								mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID ?? ""}
								className="h-full w-full text-black"
								defaultCenter={{ lat: 13.145947, lng: 123.749353 }}
								defaultZoom={14}
								clickableIcons={false}
								disableDefaultUI
								fullscreenControl
								gestureHandling="greedy"
								onClick={handleMapClick}
								restriction={{
									latLngBounds: { north: 85, south: -85, west: -180, east: 180 }
								}}
								minZoom={2}
								maxZoom={20}
								zoomControl
								zoomControlOptions={{ position: 3 }}
							>
								{selectedLocation && (
									<CustomMarker
										position={selectedLocation}
										locationData={{
											name: form.watch("name"),
											country: form.watch("country"),
											region: form.watch("region"),
											state: form.watch("state"),
											city: form.watch("city"),
											barangay: form.watch("barangay"),
											postalCode: form.watch("postalCode"),
											description: form.watch("description")
										}}
									/>
								)}
							</Map>
						</APIProvider>
					</div>
				</CardContent>
			</Card>

			{/* Form Section */}
			<Card className="flex flex-col">
				<CardHeader>
					<CardTitle>Location Details</CardTitle>
					<CardDescription>
						Fill in the details for the selected location
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-1">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Location Name</FormLabel>
										<FormControl>
											<Input placeholder="Enter location name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="country"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Country</FormLabel>
											<FormControl>
												<Input placeholder="Enter country" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="region"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Region</FormLabel>
											<FormControl>
												<Input placeholder="Enter region" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="state"
									render={({ field }) => (
										<FormItem>
											<FormLabel>State/Province</FormLabel>
											<FormControl>
												<Input placeholder="Enter state/province" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="city"
									render={({ field }) => (
										<FormItem>
											<FormLabel>City</FormLabel>
											<FormControl>
												<Input placeholder="Enter city" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="barangay"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Barangay/District</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter barangay/district"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="postalCode"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Postal Code</FormLabel>
											<FormControl>
												<Input placeholder="Enter postal code" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="latitude"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Latitude</FormLabel>
											<FormControl>
												<Input
													type="number"
													step="any"
													placeholder="0.0000"
													{...field}
													onChange={(e) =>
														field.onChange(parseFloat(e.target.value) || 0)
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="longitude"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Longitude</FormLabel>
											<FormControl>
												<Input
													type="number"
													step="any"
													placeholder="0.0000"
													{...field}
													onChange={(e) =>
														field.onChange(parseFloat(e.target.value) || 0)
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Enter description (optional)"
												className="resize-none"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Additional notes about this location
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex gap-2 pt-4">
								<Button type="submit" className="flex-1">
									Save Location
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={clearLocation}
									disabled={!selectedLocation}
								>
									Clear
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	)
}
