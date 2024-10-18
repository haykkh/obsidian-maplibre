<script lang="ts">
    import { Marker } from "svelte-maplibre"
	import MarkerSvg from "./MarkerSvg.svelte"
	import { onMount } from "svelte";
	import type { ILocationFile } from "./location-store";
	
    export let location: ILocationFile

    let marker: maplibregl.Marker | undefined

    onMount(() => {
        marker?.getElement().setAttribute("aria-label", location.name)
    })

</script>


<Marker lngLat={{ lng: location.lng, lat: location.lat }} draggable bind:marker={marker} >
     <MarkerSvg color={location.isActive ? "red" : ""} />
</Marker>