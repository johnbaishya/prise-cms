// import { apiClient } from "./apiClient";
// import ENDPOINTS from "./endpoints";
import type {
  createProductCategoryDTO,
  ListProductCategoryQueryDTO,
  updateProductCategoryDTO,
} from '@/Types/request/showcase-request'
import { apiClient } from '../apiClient'
import ENDPOINTS from '../endpoints'
import { ListResponse } from '@/Types/response/list-response'
import { IProductCategory } from '@/Types/entities/showcase-entities'

export function getProductCategoryList(
  query: ListProductCategoryQueryDTO,
  companyId: string
) {
  const filteredQuery = Object.fromEntries(
    Object.entries(query).filter(([_, value]) => value !== undefined)
  )
  const queryParams: string = new URLSearchParams(
    filteredQuery as any
  ).toString()
  return apiClient
    .get(
      ENDPOINTS.showcase.listProductCategoryByCompanyId(companyId, queryParams)
    )
    .then((res) => res.data)
}

export function getAllProductCategoryList(companyId: string):Promise<ListResponse<IProductCategory>> {
  return apiClient
    .get(ENDPOINTS.showcase.listAllProductCategoryByCompanyId(companyId))
    .then((res) => res.data)
}

export function updateProductCategory(param: {
  data: updateProductCategoryDTO
  categoryId: string
}) {
  const fd = new FormData()
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

  return apiClient.put(
    ENDPOINTS.showcase.updateProductCategory(param.categoryId),
    fd
  )
}

export function createProductCategory(param: {
  data: createProductCategoryDTO
}) {
  const data = param.data
  const { name, slug, description, companyId, image } = data
  const fd = new FormData()
  fd.append('name', name)
  fd.append('slug', slug)
  fd.append('companyId', companyId)
  if (description) {
    fd.append('description', description)
  }
  if (image instanceof File) {
    fd.append('image', image)
  }
  return apiClient.post(ENDPOINTS.showcase.createProductCategory, fd)
}

export function deleteProductCategory(param: { id: string }) {
  return apiClient.delete(ENDPOINTS.showcase.deleteProductCategory(param.id))
}
