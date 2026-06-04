
import { z } from 'zod'


export const baseCompanyformSchema = z.object({
  name: z.string().min(1, 'name is required'),
  description: z.string().optional(),
  category: z.string().min(1, 'category is required'),
  email:z.string().email('Invalid email address').optional(),
  phone: z.string().optional(),
  address:z.string().optional(),
  lat:z.string().optional(),
  lon:z.string().optional(),
  currency:z.string().min(1, 'currency is required'),
  brand_color:z.string().optional(),
  // brand_logo:z.instanceof(File),  
})

export const addCompanyFormSchema = baseCompanyformSchema.extend({
  brand_logo:z.instanceof(File), 
})



export type AddCompanyFormDTO = z.infer<typeof addCompanyFormSchema>
export type EditCompanyFormDTO = z.infer<typeof baseCompanyformSchema>
