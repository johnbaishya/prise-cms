import { deleteGalleryImage } from "@/api/core/gallery.service";
import { addShowcaseBannerImages, getShowcaseBannerImages } from "@/api/showcase/banner.service";
import { SelectedImagesDialog } from "@/components/selected-images-dialog";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { BannerThumbnail, ImageThumbnail } from "@/components/ui/image-thumbnail";
import { Input } from "@/components/ui/input";
import { SidebarMenuSkeleton } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getSelectedCompanyId, showAppLoader, showConfirmDialog } from "@/stores/actions/app-actions";
import { QueryKey } from "@/Types/appEnums";
import type { IGallery } from "@/Types/entities/core-entities";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
// import { getRouteApi } from "@tanstack/react-router"
import { useState } from "react";
import { toast } from "sonner";


// const route = getRouteApi('/_authenticated/showcase/product/');
export const Banner = () => {
    // const navigate = route.useNavigate();
    const [selectedImages, setSelectedImages] = useState<File[]>([]);



    const queryClient = useQueryClient();

    const { data: bannerImages, isLoading: bannerImagesLoading } = useQuery({
        queryKey: [QueryKey.LIST_SHOWCASE_BANNER_IMAGES],
        queryFn: () => getShowcaseBannerImages({ companyId: getSelectedCompanyId() })
    })


    const addBannerImagesMutation = useMutation({
        mutationFn: addShowcaseBannerImages,
        onMutate: () => { showAppLoader(true) },
        onSettled: () => { showAppLoader(false) },
        onSuccess: () => {
            setSelectedImages([])
            toast.success("Images added Successfully !!!");
            queryClient.invalidateQueries({
                queryKey: [QueryKey.LIST_SHOWCASE_BANNER_IMAGES]
            })
        }
    })


    const galleryDeleteMutation = useMutation({
        mutationFn: deleteGalleryImage,
        onMutate: () => {
            showAppLoader(true)
            console.log("mutation started")
        },
        onSettled: () => { showAppLoader(false) },
        onSuccess: (data) => {
            console.log("this is success", data);
            toast.success("image deleted successfully !!!");
            queryClient.invalidateQueries({
                queryKey: [QueryKey.LIST_SHOWCASE_BANNER_IMAGES]
            })
        },
        onError: (err: AxiosError) => {
            toast.error(err?.response?.data as string)
            console.log("this error", err.response)
        }
    })




    const handleDeleteImage = async (image: IGallery) => {
        console.log(image);

        const access = await showConfirmDialog({
            title: "Delete Image ?",
            description: "Are you sure want to delete this image",
            confirmText: "Delete",
            cancelText: "Cancel",
            destructive: true
        });

        if (!access) {
            return;
        }

        galleryDeleteMutation.mutate({ id: image._id });
    }






    return (
        <div>
            <Card className='mt-5 mx-4'>
                <CardHeader>
                    <h1 className="text-2xl">
                        Banner Images

                    </h1>
                </CardHeader>
                <CardContent>
                    <div className='grid grid-cols-1 gap-2 md:grid-cols-2 md:items-start'>
                        {bannerImagesLoading &&
                            <>
                                <SidebarMenuSkeleton className='md:col-span-2 md:text-right m-5 h-20' />
                                <Skeleton className='md:col-span-2 md:text-right m-5 h-20' />
                                <Skeleton className='md:col-span-2 md:text-right m-5 h-20' />
                            </>
                        }

                        {
                            bannerImages?.map((item) => {
                                return (
                                    <BannerThumbnail
                                        data={item}
                                        key={item.key}
                                        src={item.location}
                                        className='md:col-span-1 md:text-right border-2'
                                        deletable
                                        onDelete={(image) => {
                                            handleDeleteImage(image)

                                        }}
                                        imageStyle={{ aspectRatio: "16/9", width: "100%" }}
                                    />
                                )
                            })
                        }
                    </div>
                </CardContent>
                <CardFooter>
                    <div className='flex justify-center pt-4 w-full'>
                        <label for="file-upload" class="custom-file-upload" className={cn(buttonVariants({ variant: "outline", size: "default" }))} >
                            Add More Images +
                            {/* <Button variant={"outline"} >Add More Images..</Button> */}
                        </label>
                        <Input
                            type='file'
                            accept='image/*'
                            id='file-upload'
                            multiple
                            hidden
                            onChange={(e) => {
                                if (!e.target.files) return;
                                setSelectedImages(Array.from(e.target.files))
                            }}
                        //  className={cn(buttonVariants({ variant: "default", size: "default" }))} 
                        />
                    </div>
                </CardFooter>
            </Card>
            <SelectedImagesDialog
                open={selectedImages.length > 0}
                images={selectedImages}
                onClose={() => {
                    setSelectedImages([])
                }}
                onSubmit={() => {
                    addBannerImagesMutation.mutate({ companyId: getSelectedCompanyId(), images: selectedImages })
                }}
            />
        </div>
    )
}