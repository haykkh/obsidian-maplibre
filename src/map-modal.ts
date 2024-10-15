import { App, Modal } from "obsidian"

export const VIEW_TYPE_MAP_MODAL = "map-modal"

export class MapModal extends Modal {
  constructor(app: App) {
    super(app)
  }

  getViewType() {
    return VIEW_TYPE_MAP_MODAL
  }

  getDisplayText() {
    return "Map view"
  }

  async onOpen() {
  }

  async onClose() {
  }

}