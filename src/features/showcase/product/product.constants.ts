import type { AddProductForm } from "./product.types";


export const defaultAddProductForm = ():Partial<AddProductForm>=>({
  name: '',
  slug: '',
  description: '',
  price: 0,
  originalPrice: 0,
  productCategoryId: null as any ,
  tags: [],
  stock: 0,
  images: [],
})