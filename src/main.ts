import locationStore from "./location-store"
import { MapView } from "./map-view"
import { VIEW_TYPE_MAP } from "./map-view"
import { Plugin } from "obsidian"

export default class MapPlugin extends Plugin {
	async onload() {
		this.syncLocationStore()

		this.registerView(VIEW_TYPE_MAP, (leaf) => new MapView(leaf))

		this.addRibbonIcon("map", "Open map", () =>
			MapView.activateView(this.app),
		)
	}

	async onunload() {}

	syncLocationStore() {
		console.error("synchLocationStore")
		this.app.workspace.on('active-leaf-change', async () => {
			console.error("synchLocationStore", "active-leaf-change")
			const { lng, lat } = await this.getCoordinates()
			
			console.error("synchLocationStore", "getCoordinates", lng, lat)
			if (lng && lat) {
				locationStore.lng.set(lng)
				locationStore.lat.set(lat)
			}
		})
	}

	async getCoordinates() {
		const activeFile = this.app.workspace.getActiveFile()
		if (!activeFile) return { lng: null, lat: null }
	
		const content = await this.app.vault.read(activeFile)
		const lngMatch = content.match(/lng:\s*([-\d.]+)/)
		const latMatch = content.match(/lat:\s*([-\d.]+)/)

		return {
		  lng: lngMatch ? parseFloat(lngMatch[1]) : null,
		  lat: latMatch ? parseFloat(latMatch[1]) : null
		}
	  }
}
