import type { IProductCategory, IProductTag, IProductWithGallery } from "../entities/showcase-entities"
import type { ListResponse } from "./list-response"

export type ListProductResponse = ListResponse<IProductWithGallery>
export type ListProductCategoryResponse = ListResponse<IProductCategory>
export type ListProductTagResponse = ListResponse<IProductTag>