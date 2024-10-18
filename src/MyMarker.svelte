<script lang="ts">
    import { Marker } from "svelte-maplibre"
	import MarkerSvg from "./MarkerSvg.svelte"
	import { createEventDispatcher, onMount } from "svelte";
	import type { ILocationFile } from "./location-store";

    export let location: ILocationFile

    let marker: maplibregl.Marker | undefined
    let markerElement: HTMLElement | undefined

    onMount(() => {
        markerElement = marker?.getElement()
        markerElement?.setAttribute("aria-label", location.name)

        markerElement?.addEventListener("pointerdown", handleClick, { capture: true })
    })

    const dispatch = createEventDispatcher()

    const handleClick = (_event: PointerEvent) => dispatch("click", { location })

</script>


<Marker lngLat={{ lng: location.lng, lat: location.lat }} draggable bind:marker={marker} >
     <MarkerSvg color={location.isActive ? "red" : ""} />
</Marker>