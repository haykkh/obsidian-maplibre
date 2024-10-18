<script lang="ts">
  import { MapLibre } from "svelte-maplibre"
  import {
    activeLocation,
    locations,
    type ILocationFile
  } from "./location-store"
  import MyMarker from "./MyMarker.svelte"
  import "maplibre-gl/dist/maplibre-gl.css"
  import { createEventDispatcher } from "svelte"

  let locationsLocal = new Map<string, ILocationFile>()
  let activeLocationLocal: ILocationFile | null = null

  locations.subscribe((newLocations) => {
    locationsLocal = newLocations
  })

  activeLocation.subscribe((newActiveLocation) => {
    activeLocationLocal = newActiveLocation ?? null
  })

  const dispatch = createEventDispatcher()
  const handleMarkerClick = (event: CustomEvent) =>
    dispatch("marker-click", { ...event.detail })

  $: activeLngLat = activeLocationLocal
    ? { lng: activeLocationLocal.lng, lat: activeLocationLocal.lat }
    : { lng: 0, lat: 0 }
  $: isActive = (location: ILocationFile) =>
    location.path === activeLocationLocal?.path
</script>

<MapLibre
  center={activeLngLat}
  zoom={10}
  class="map"
  standardControls
  style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
>
  {#each locationsLocal as [_path, location]}
    <MyMarker
      {location}
      isActive={isActive(location)}
      on:click={handleMarkerClick}
    />
  {/each}
</MapLibre>

<style>
  :global(.map) {
    width: 100%;
    height: 100%;
  }
</style>
