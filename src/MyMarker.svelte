<script lang="ts">
    import { Marker } from "svelte-maplibre"
	import MarkerSvg from "./MarkerSvg.svelte"
	import { onMount } from "svelte";
	
    export let lngLat: { lng: number, lat: number }
    export let name: string
    export let isActive: boolean

    let marker: maplibregl.Marker | undefined

    onMount(() => {
        marker?.getElement().setAttribute("aria-label", name)
    })

</script>


<Marker lngLat={lngLat} draggable bind:marker={marker} >
     <MarkerSvg color={isActive ? "red" : ""} />
</Marker>