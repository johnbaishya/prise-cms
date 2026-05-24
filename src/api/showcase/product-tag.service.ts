// import { apiClient } from "./apiClient";
// import ENDPOINTS from "./endpoints";
import {
  createProductTagDTO,
  ListProductTagQueryDTO,
  updateProductTagDTO,
} from '@/Types/request/showcase-request'
import { apiClient } from '../apiClient'
import ENDPOINTS from '../endpoints'
import { ListResponse } from '@/Types/response/list-response'
import { IProductTag } from '@/Types/entities/showcase-entities'

export function getProductTagList(
  query: ListProductTagQueryDTO,
  companyId: string
) {
  const filteredQuery = Object.fromEntries(
    Object.entries(query).filter(([_, value]) => value !== undefined)
  )
  let queryParams: string = new URLSearchParams(filteredQuery as any).toString()
  return apiClient
    .get(ENDPOINTS.showcase.listProductTagByCompanyId(companyId, queryParams))
    .then((res) => res.data)
}

// ==========================================================================================================================================================================

export function getAllProductTagList(companyId: string):Promise<ListResponse<IProductTag>> {
  return apiClient
    .get(ENDPOINTS.showcase.listAllProductTagByCompanyId(companyId))
    .then((res) => res.data)
}



// ================================================================================================================================

export function updateProductTag(param: {
  data: updateProductTagDTO
  tagId: string
}) {
  let fd = new FormData()
  const data = param.data
  const { name, slug, description, image } = data
  if (name) {
    fd.append('name', name)
  }
  if (slug) {
    fd.append('slug', slug)
  }
  if (description) {
    fd.append('description', description)
  }
  if (image instanceof File) {
    fd.append('image', image)
  }

  return apiClient.put(ENDPOINTS.showcase.updateProductTag(param.tagId), fd)
}

export function createProductTag(param: { data: createProductTagDTO }) {
  const data = param.data
  const { name, slug, description, companyId, image } = data
  let fd = new FormData()
  fd.append('name', name)
  fd.append('slug', slug)
  fd.append('companyId', companyId)
  if (description) {
    fd.append('description', description)
  }
  if (image instanceof File) {
    fd.append('image', image)
  }
  return apiClient.post(ENDPOINTS.showcase.createProductTag, fd)
}

export function deleteProductTag(param: { id: string }) {
  return apiClient.delete(ENDPOINTS.showcase.deleteProductTag(param.id))
}
