import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QueryKey } from '@/Types/appEnums'
import { showAppLoader } from '@/stores/actions/app-actions'
import { Button } from '@/components/ui/button'
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
import { defaultAddCompanyFormValues } from '../company.constants'
import { type AddCompanyFormDTO, baseCompanyformSchema } from '../company.types'
import { getRouteApi } from '@tanstack/react-router'
import { createCompany } from '@/api/core/company.service'

const route = getRouteApi('/_authenticated/company/add');



export default function AddCompany() {

    const navigate = route.useNavigate()
    const form = useForm<AddCompanyFormDTO>({
        resolver: zodResolver(baseCompanyformSchema),
        defaultValues: defaultAddCompanyFormValues()
    })

    const [previewImage, setPreviewImage] = useState<string>("")

    const handleImagePreview = () => {
        const image = form.getValues('brand_logo')
        if (image) {
            const imgUri: string = URL.createObjectURL(image)
            setPreviewImage(imgUri)


        }
    }

    const imagesInputWatcher = form.watch('brand_logo')


    const onSubmit = (values: AddCompanyFormDTO) => {
        companyAddMutation.mutate({ data: values })
    }


    const queryClient = useQueryClient();


    const companyAddMutation = useMutation({
        mutationFn: createCompany,
        onMutate: () => { showAppLoader(true) },
        onSettled: () => { showAppLoader(false) },
        onSuccess: () => {
            form.reset(defaultAddCompanyFormValues());
            navigate({
                to: "/company",
            })
            toast.success("Company created Successfully !!!");
            queryClient.invalidateQueries({
                queryKey: [QueryKey.LIST_COMPANIES]
            });
        },

    });




    useEffect(() => {
        handleImagePreview()
    }, [imagesInputWatcher])


    return (
        <>
            <div className='mx-auto w-full max-w-2xl px-4 py-6'>

                {/* Header */}
                <div className='mb-6'>
                    <h1 className='text-2xl font-semibold'>Add New Company</h1>
                    <p className='text-sm text-muted-foreground'>
                        Create new Company here.
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
                            <FormField
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
                            />

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
                                <Button type='submit'>Create Company</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    )
}
