import {z} from "zod";
import { IGallery } from "./core-entities";


const productCategoryAndTagSchema = z.object({
  _id:z.string(),
  name:z.string(),
  slug:z.string(),
  description:z.string(),
  company:z.string(),
  image:z.union([
    z.string(),
    z.instanceof(File)
  ]) ,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

const productSchema = z.object({
  _id:z.string(),
  name:z.string(),
  slug: z.string(),
  description: z.string().optional(),
  originalPrice: z.number().optional(),
  price: z.number(),
  company: z.string(),
  productCategory:productCategoryAndTagSchema,
  tags: z.array(productCategoryAndTagSchema),
  stock: z.number(),
})

export type IProduct = z.infer<typeof productSchema>; 

// export interface IProduct extends Document {
//   _id:Types.ObjectId;
//   name: string;
//   slug: string;
//   description?: string;
//   originalPrice?: number;
//   price: number;
//   company: Types.ObjectId;
//   productCategory: Types.ObjectId;
//   tags: Types.ObjectId[];
//   stock: number;
// }



export type IProductCategory = z.infer<typeof productCategoryAndTagSchema>
export type IProductTag = z.infer<typeof productCategoryAndTagSchema>
// export interface IProductCategory extends Document {
//   name: string;
//   slug: string;
//   description?: string;
//   company: Types.ObjectId;
// } 



// export interface IProductTag extends Document {
//   name: string;
//   slug: string;
//   description?: string;
//   company: Types.ObjectId;
// }


export interface IProductWithGallery extends IProduct {
  gallery:IGallery[];
}



