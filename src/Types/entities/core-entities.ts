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


