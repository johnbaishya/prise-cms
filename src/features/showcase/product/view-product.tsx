import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QueryKey } from '@/Types/appEnums'
import AsyncSelect from 'react-select/async'
import { getSelectedCompanyId, showAppLoader, showConfirmDialog } from '@/stores/actions/app-actions'
import { Button, buttonVariants } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { ImageThumbnail } from '@/components/ui/image-thumbnail'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getAllProductCategoryList } from '@/api/showcase/product-category.service'
import { getAllProductTagList } from '@/api/showcase/product-tag.service'
import { getReactSelectLoadOptions, mapDataToSelectOption } from '@/lib/react-select-option-handler'
import { addProductGallery, createProduct, getProductGallery, updateProduct } from '@/api/showcase/product.service'
import { toast } from 'sonner'
import { type CreateProductDTO } from '@/Types/request/showcase-request'
import { defaultAddProductForm } from './product.constants'
import { type AddProductForm, addProductformSchema, EditProductForm } from './product.types'
import { getRouteApi } from '@tanstack/react-router'
import { useShowcaseStore } from '@/stores/showcase-store'
import { mapProductToForm } from './product.utils'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { deleteGalleryImage } from '@/api/core/gallery.service'
import { Skeleton } from '@/components/ui/skeleton'
import { IGallery } from '@/Types/entities/core-entities'
import { SelectedImagesDialog } from '@/components/selected-images-dialog'
import { cn } from '@/lib/utils'
import ThumbGallerySwiper from '@/components/thumbs-gallery-swiper'


const route = getRouteApi('/_authenticated/showcase/product/view')



export default function ViewProduct() {

    const navigate = route.useNavigate()
    const { selectedProductRow } = useShowcaseStore(state => state)
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const showOriginalPrice = (): boolean => {
        const { price, originalPrice } = selectedProductRow;

        if (!!price && !!originalPrice) {
            const np = Number(price);
            const nop = Number(originalPrice);

            if (np == nop) {
                return false
            }

            return true;
        }
    }

    const stockNumber = selectedProductRow?.stock ? Number(selectedProductRow?.stock) : 0;

    // const getStockText = (): string => {
    //     const stock = selectedProductRow?.stock;
    //     if (!stock) return "";
    //     let st = Number(stock);
    //     if (st<= 5){
    //         return "
    //     }
    // }


    return (
        <div className='container mx-auto w-full max-w-6xl px-4 py-6'>
            {/* Header */}
            {/* <div className='mb-6'>
                <h1 className='text-2xl font-semibold'>Product Detail</h1>
                <p className='text-sm text-muted-foreground'>
                    Update Existing Product here.
                </p>
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-3 product-detail-container">
                <div className=" p-2 product-gallery col-span-3">
                    <ThumbGallerySwiper images={selectedProductRow?.gallery} />
                </div>

                <div className="p-2 product-detail-content col-span-2">
                    <div className='border-b-2 pb-5'>

                        <h1 className='text-3xl font-light  font-semibold'>
                            {selectedProductRow?.name}
                        </h1>
                        <h2 className='text font-light'>
                            {selectedProductRow?.productCategory.name}
                        </h2>
                        <h2 className='text-xs font-extralight'>
                            {
                                selectedProductRow?.tags?.map(item => {
                                    return (
                                        item.name
                                    )
                                })
                                    .join(" | ")
                            }
                        </h2>
                    </div>
                    <div className='pt-5' >
                        <span className='font-bold text-emerald-700 text-3xl' >
                            ${selectedProductRow?.price}
                        </span>
                        {showOriginalPrice() &&
                            <span className=' text-emerald-600 line-through ml-3 text-lg' >
                                ${selectedProductRow?.originalPrice}
                            </span>
                        }
                        {
                            <>
                                {
                                    stockNumber > 5 ?
                                        <>
                                            <p className='font-bold mt-1 text-green-700'>
                                                In Stock
                                            </p>
                                        </>
                                        : stockNumber < 1 ?
                                            <p className='font-bold mt-1 text-red-400'>
                                                Out Of Stock
                                            </p> :
                                            <p className='font-light mt-1'>
                                                <span className='text-xl font-semibold'>{selectedProductRow.stock}</span> items left
                                            </p>
                                }
                            </>
                        }
                        <Button className='mt-3'>Purchase </Button>
                    </div>
                    <p className='text-sm font-extralight border-t-1 pt-3 mt-3' >
                        {selectedProductRow?.description}
                    </p>
                </div>
            </div>
        </div>
    )
}
