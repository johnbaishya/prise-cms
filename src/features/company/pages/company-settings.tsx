import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QueryKey } from '@/Types/appEnums'
import { showAppLoader, updateAppState } from '@/stores/actions/app-actions'
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
import { toast } from 'sonner'
import { type AddCompanyFormDTO, baseCompanyformSchema, type EditCompanyFormDTO } from '../company.types'
import { getRouteApi } from '@tanstack/react-router'
import { createCompany, getCompanyDetail, updateCompany, updateCompanyBrandLogo } from '@/api/core/company.service'
import { emptyAddCompanyFormValues } from '../company.constants'
import { useAppStore } from '@/stores/app-store'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { SelectedImagesDialog } from '@/components/selected-images-dialog'
import { Building } from 'lucide-react'

const route = getRouteApi('/_authenticated/company/add');



export default function CompanySettings() {

    const { selectedCompany } = useAppStore(state => state)

    const navigate = route.useNavigate()
    const form = useForm<EditCompanyFormDTO>({
        resolver: zodResolver(baseCompanyformSchema),
        defaultValues: selectedCompany || emptyAddCompanyFormValues(),
    })

    const [previewImage, setPreviewImage] = useState<string>("")
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    // const handleImagePreview = () => {
    //     const image = form.getValues('brand_logo')
    //     if (image) {
    //         const imgUri: string = URL.createObjectURL(image)
    //         setPreviewImage(imgUri)
    //     }
    // }



    const onSubmit = (values: AddCompanyFormDTO) => {
        if (selectedCompany?._id) {
            companyupdateMutation.mutate({ companyId: selectedCompany?._id, data: values })
        }
    }


    const queryClient = useQueryClient();


    const companyupdateMutation = useMutation({
        mutationFn: updateCompany,
        onMutate: () => { showAppLoader(true) },
        onSettled: () => { showAppLoader(false) },
        onSuccess: () => {
            navigate({
                to: "/company",
            })
            toast.success("Company updated Successfully !!!");
            queryClient.invalidateQueries({
                queryKey: [QueryKey.LIST_COMPANIES]
            });
        },

    });

    const refreshSelectedCompany = async () => {
        if (selectedCompany?._id) {
            const company = await getCompanyDetail({ companyId: selectedCompany?._id });
            updateAppState({
                selectedCompany: company
            })
        }
    }



    const companyBrandLogoUpdateMutation = useMutation({
        mutationFn: updateCompanyBrandLogo,
        onMutate: () => { showAppLoader(true) },
        onSettled: () => { showAppLoader(false) },
        onSuccess: (data) => {
            setSelectedImage(null);
            refreshSelectedCompany()
            // navigate({
            //     to: "/company",
            // })
            toast.success("brand logo updated Successfully !!!");
            queryClient.invalidateQueries({
                queryKey: [QueryKey.LIST_COMPANIES]
            });
        },

    });








    useEffect(() => {
        form.reset(selectedCompany || emptyAddCompanyFormValues())
    }, [selectedCompany])


    return (
        <>
            <div className='mx-auto w-full max-w-2xl px-4 py-6'>

                {/* Header */}
                <div className='mb-6'>
                    <h1 className='text-2xl font-semibold'>Company Settings</h1>
                    <p className='text-sm text-muted-foreground'>
                        configure company settings
                    </p>
                </div>

                {/* Form Card */}
                <div className='rounded-lg border bg-card p-4 shadow-sm md:p-6'>
                    <Form {...form}>
                        <form
                            id='add-company-form'
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-6'
                        >
                            {/* Name */}
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-1 gap-2 md:grid-cols-6 md:items-center'>
                                        <FormLabel className='md:col-span-2 md:text-right'>
                                            Name
                                        </FormLabel>
                                        <div className='md:col-span-4'>
                                            <FormControl>
                                                <Input
                                                    placeholder='Comapany Name *'
                                                    autoComplete='off'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* category */}
                            <FormField
                                control={form.control}
                                name='category'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-1 gap-2 md:grid-cols-6 md:items-center'>
                                        <FormLabel className='md:col-span-2 md:text-right'>
                                            Category
                                        </FormLabel>
                                        <div className='md:col-span-4'>
                                            <FormControl>
                                                <Input
                                                    placeholder='eg. IT, Manufacturing, Hospitality etc *'
                                                    autoComplete='off'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Slug */}
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-1 gap-2 md:grid-cols-6 md:items-center'>
                                        <FormLabel className='md:col-span-2 md:text-right'>
                                            Email
                                        </FormLabel>
                                        <div className='md:col-span-4'>
                                            <FormControl>
                                                <Input
                                                    type='email'
                                                    placeholder='Company Email'
                                                    autoComplete='off'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            {/* phone */}
                            <FormField
                                control={form.control}
                                name='phone'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-1 gap-2 md:grid-cols-6 md:items-center'>
                                        <FormLabel className='md:col-span-2 md:text-right'>
                                            Phone
                                        </FormLabel>
                                        <div className='md:col-span-4'>
                                            <FormControl>
                                                <Input
                                                    type='tel'
                                                    placeholder='Company Phone Number'
                                                    autoComplete='off'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-1 gap-2 md:grid-cols-6 md:items-start'>
                                        <FormLabel className='md:col-span-2 md:text-right'>
                                            Description
                                        </FormLabel>

                                        <div className='md:col-span-4'>
                                            <FormControl>
                                                <Textarea
                                                    placeholder='Type the description of the Company'
                                                    rows={3}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* address */}
                            <FormField
                                control={form.control}
                                name='address'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-1 gap-2 md:grid-cols-6 md:items-center'>
                                        <FormLabel className='md:col-span-2 md:text-right'>
                                            Address
                                        </FormLabel>
                                        <div className='md:col-span-4'>
                                            <FormControl>
                                                <Input
                                                    placeholder='asddress of the company'
                                                    autoComplete='off'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Currency */}
                            <FormField
                                control={form.control}
                                name='currency'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-1 gap-2 md:grid-cols-6 md:items-center'>
                                        <FormLabel className='md:col-span-2 md:text-right'>
                                            Currency
                                        </FormLabel>
                                        <div className='md:col-span-4'>
                                            <FormControl>
                                                <Input
                                                    placeholder='currency used by company for transactions (eg. USD, EUR, GBP etc)'
                                                    autoComplete='off'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Brand Color */}
                            <FormField
                                control={form.control}
                                name='brand_color'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-1 gap-2 md:grid-cols-6 md:items-center'>
                                        <FormLabel className='md:col-span-2 md:text-right'>
                                            Brand Color
                                        </FormLabel>
                                        <div className='md:col-span-4'>
                                            <FormControl>
                                                <Input
                                                    type='color'
                                                    placeholder='type comapany Category eg. IT, Manufacturing, Hospitality etc *'
                                                    autoComplete='off'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            {/* Brand Logo */}
                            {/* <FormField
                                control={form.control}
                                name='brand_logo'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-1 gap-2 md:grid-cols-6 md:items-start'>
                                        <FormLabel className='md:col-span-2 md:text-right'>
                                            Logo
                                        </FormLabel>

                                        <div className='space-y-3 md:col-span-4'>
                                            <FormControl>
                                                <Input
                                                    type='file'
                                                    accept='image/*'
                                                    name={field.name}
                                                    ref={field.ref}
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0]
                                                        if (file) {
                                                            field.onChange(file)
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            /> */}

                            {!!previewImage && (
                                <div className='grid grid-cols-1 gap-2 md:grid-cols-6 md:items-start'>
                                    <ImageThumbnail
                                        src={previewImage}
                                        className='md:col-span-2 md:text-right border-2'
                                    />
                                </div>
                            )}

                            {/* Actions */}
                            <div className='flex justify-end pt-4'>
                                <Button type='submit'>Save Changes</Button>
                            </div>
                        </form>
                    </Form>
                </div>
                <Card className='mt-5'>
                    <CardHeader>
                        <h2 className='text-lg font-semibold'>Brand Logo</h2>
                        {
                            selectedCompany?.brand_logo ?
                                <ImageThumbnail className='w-xs' src={selectedCompany?.brand_logo} /> :
                                <Building size={100} />
                        }
                        <CardFooter>
                            <div className='flex justify-center pt-4 w-full'>
                                <label for="file-upload" class="custom-file-upload" className={cn(buttonVariants({ variant: "outline", size: "default" }))} >
                                    Select New Logo
                                    {/* <Button variant={"outline"} >Add More Images..</Button> */}
                                </label>
                                <Input
                                    type='file'
                                    accept='image/*'
                                    id='file-upload'
                                    multiple
                                    hidden
                                    onChange={(e) => {
                                        if (!!e.target.files[0]) {
                                            setSelectedImage(e.target.files[0])
                                        };
                                    }}
                                //  className={cn(buttonVariants({ variant: "default", size: "default" }))} 
                                />
                            </div>
                        </CardFooter>
                    </CardHeader>
                </Card>
            </div>
            {!!selectedImage &&
                <SelectedImagesDialog
                    open={!!selectedImage}
                    images={[selectedImage]}
                    onClose={(state) => {
                        setSelectedImage(null)
                    }}
                    confirmText="Select Image"
                    onSubmit={() => {
                        if (selectedCompany?._id) {
                            companyBrandLogoUpdateMutation.mutate({ companyId: selectedCompany?._id, image: selectedImage })
                        }
                        // if (!selectedProductRow?._id) return
                        // addProductGalleryMutation.mutate({ id: selectedProductRow?._id, images: selectedImages })
                    }}
                />
            }
        </>
    )
}
