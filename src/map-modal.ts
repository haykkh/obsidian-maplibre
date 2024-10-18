import { App, Modal } from "obsidian"

export const VIEW_TYPE_MAP_MODAL = "map-modal"

export class MapModal extends Modal {
  constructor(app: App) {
    super(app)
  }

  getViewType = (): string => VIEW_TYPE_MAP_MODAL

  getDisplayText = (): string => "Map view"

  onOpen = async () => {}

  onClose = async () => {}
}
