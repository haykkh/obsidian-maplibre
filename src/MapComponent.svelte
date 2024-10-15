<script lang="ts">
    import { MapLibre, DefaultMarker, Popup } from "svelte-maplibre"
    import { lngLat, name } from "./location-store"

	import "maplibre-gl/dist/maplibre-gl.css";

	let nameLocal = "";
	let lngLatLocal = { lng: 0, lat: 0 };

    lngLat.subscribe((newLngLat) => {
		if (newLngLat.lng && newLngLat.lat) {
			lngLatLocal = newLngLat;
		}
	});

	name.subscribe((newName) => {
		nameLocal ??= newName;
		if (newName) {
			nameLocal = newName;
		}
	});
</script>

<MapLibre
    center={lngLatLocal}
	zoom={7}
	class="map"
	standardControls
	style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
>
    <DefaultMarker lngLat={lngLatLocal} draggable>
        <Popup offset={[0, -10]}>
            <div>Hello</div>
        </Popup>
    </DefaultMarker>
</MapLibre>

<style>
	:global(.map) {
		width: 100%;
		height: 100%;
	}
</style>