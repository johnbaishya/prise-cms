import { apiClient } from "../apiClient"
import ENDPOINTS from "../endpoints"

export const deleteGalleryImage = (param: { id: string }) =>{
  return apiClient.delete(ENDPOINTS.core.deleteGalleryimage(param.id))
}
