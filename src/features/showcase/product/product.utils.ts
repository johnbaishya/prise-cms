import type { IProduct } from "@/Types/entities/showcase-entities";
import type{ EditProductForm } from "./product.types";
import { defaultAddProductForm } from "./product.constants";

 export const mapProductToForm = (product:IProduct):EditProductForm=>{
 return {
    name: product.name,
    slug: product.slug,
    description: product.description,
    originalPrice: product.originalPrice,
    price: product.price,
    stock: product.stock,

    productCategoryId: {
      label: product.productCategory.name,
      value: product.productCategory._id,
    },

    tags: product.tags.map((tag) => ({
      label: tag.name,
      value: tag._id,
    })),
  }
 }