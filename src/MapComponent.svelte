<script lang="ts">
    import { MapLibre, DefaultMarker, Popup } from "svelte-maplibre"
    import { lngLat, locations, type ILocationFile } from "./location-store"

	import "maplibre-gl/dist/maplibre-gl.css";

	let lngLatLocal = { lng: 0, lat: 0 }
	let locationsLocal = new Map<string, ILocationFile>()

	locations.subscribe((newLocations) => {
		locationsLocal = newLocations
	})

    lngLat.subscribe((newLngLat) => {
		if (newLngLat.lng && newLngLat.lat) {
			lngLatLocal = newLngLat;
		}
	})
</script>

<MapLibre
    center={lngLatLocal}
	zoom={7}
	class="map"
	standardControls
	style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
>
{#each locationsLocal as [_path, { lng, lat, name }]}
	
<DefaultMarker lngLat={[lng,lat]} draggable>
	<Popup offset={[0, -10]}>
		<div>{name}</div>
	</Popup>
</DefaultMarker>
{/each}
</MapLibre>

<style>
	:global(.map) {
		width: 100%;
		height: 100%;
	}
</style>