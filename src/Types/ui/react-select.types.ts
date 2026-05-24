import {z} from "zod";


export const selectOptionSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1,"category is required"),
})


export type SelectOption = z.infer<typeof selectOptionSchema>