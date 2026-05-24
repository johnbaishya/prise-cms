
import { selectOptionSchema, type SelectOption } from '@/Types/ui/react-select.types'
import { z } from 'zod'




export const addProductformSchema = z.object({
  name: z.string().min(1, 'name is required'),
  slug: z.string().min(1, 'slug is required'),
  description: z.string().optional(),
  originalPrice: z
    .number()
    .min(1, 'original price must be greater than 0')
    .optional(),
  price: z.number().min(1, 'price must be greater than 0'),
  // productCategoryId: z.string().min(1, 'category is required'),
  productCategoryId: selectOptionSchema
  .nullable()
  .refine((val) => val !== null, {
    message: "Category is required",
  }),
  // tags: z.array(z.string()).optional(),
  tags: z.custom<SelectOption[]>(),
  stock: z.number().min(0, 'stock cannot be negative').optional(),
  images: z.array(z.instanceof(File)).optional(),
})


export type AddProductForm = z.infer<typeof addProductformSchema>