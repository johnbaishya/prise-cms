import { Currency } from "lucide-react"
import { z } from "zod"

export enum EntityType{
    Company="Company",
    ClockMeSite = "ClockMeSite",
    User = "User",
    Product = "Product",
}


const gallerySchema = z.object({
    _id:z.string(),
    entityType:z.enum(EntityType),
    entityId:z.string(),
    key: z.string(),
    location: z.string(),
    bucket: z.string(),
    acl: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
})


export type IGallery = z.infer<typeof gallerySchema>


const companySchema = z.object({
    _id:z.string(),
    name:z.string(),
    description:z.string().optional(),
    phone:z.string().optional(),
    email:z.string().email().optional(),
    address:z.string().optional(),
    lat:z.string().optional(),
    lon:z.string().optional(),
    user_id:z.string(),
    category:z.string(),
    currency:z.string().optional(),
    brand_color:z.string().optional(),
    brand_logo:z.string().optional(),
})

export type ICompany = z.infer<typeof companySchema>


const userSchema = z.object({
    _id:z.string(),
    first_name:z.string().min(3),
    last_name:z.string().min(2),
    email:z.email(),
    profile_pic:z.string(),
    phone:z.string().optional(),

})

export type IUser = z.infer<typeof userSchema>
// export interface IUser {
//     id:string
//     firstName:string
//     lastName:string
//     email:string
//     profilePic:string
// }



// export interface IGallery extends Document {
//     _id:string
//   entityType: EntityType;
//   entityId: Types.ObjectId;
//   key: string;
//   location: string;
//   bucket?: string;
//   acl?: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }


