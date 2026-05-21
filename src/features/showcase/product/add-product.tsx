import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IProductCategory } from '@/Types/entities/showcase-entities'
import Select from 'react-select'
import { useShowcaseStore } from '@/stores/showcase-store'
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

// const formSchema = z
//   .object({
//     name: z.string().min(1, 'Name is required.'),
//     slug: z.string().min(1, 'slug is required'),
//     image: z.union([z.string(),z.instanceof(File)]),
//     description: z.string().optional(),
//     isEdit: z.boolean(),
//   });

const formSchema = z.object({
  name: z.string().min(1, 'name is required'),
  slug: z.string().min(1, 'slug is required'),
  description: z.string().optional(),
  originalPrice: z
    .number()
    .min(1, 'original price must be greater than 0')
    .optional(),
  price: z.number().min(1, 'price must be greater than 0'),
  productCategoryId: z.string().min(1, 'category is required'),
  tags: z.array(z.string()).optional(),
  stock: z.number().min(0, 'stock cannot be negative').optional(),
  images: z.array(z.instanceof(File)).optional(),
})
type UserForm = z.infer<typeof formSchema>

type ProductCategoryActionDialogProps = {
  currentRow?: IProductCategory
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AddProduct() {
  const isEdit = true
  const currentRow = useShowcaseStore((state) => state.selectedProductTagRow)
  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    // defaultValues:
    //   {
    //       name: 'john',
    //       slug: 'asdf',
    //       description: 'adsf',
    //     //   isEdit,
    //       image:undefined
    //     },
  })

  const [previewImages, setPreviewImages] = useState<string[]>([])

  const handleImagePreview = () => {
    const images = form.getValues('images')
    if (Array.isArray(images)) {
      const imageUrlArray = images.map((item) => {
        const imgUri: string = URL.createObjectURL(item)
        return imgUri
      })

      setPreviewImages(imageUrlArray)
    }
  }

  const imagesInputWatcher = form.watch('images')

  useEffect(() => {
    handleImagePreview()
  }, [imagesInputWatcher])

  return (
    <div className='mx-auto w-full max-w-2xl px-4 py-6'>
      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-2xl font-semibold'>Add New Product</h1>
        <p className='text-sm text-muted-foreground'>
          Create new Product here.
        </p>
      </div>

      {/* Form Card */}
      <div className='rounded-lg border bg-card p-4 shadow-sm md:p-6'>
        <Form {...form}>
          <form
            id='category-form'
            // onSubmit={form.handleSubmit(onSubmit)}
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
                        placeholder='Product Name'
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
              name='slug'
              render={({ field }) => (
                <FormItem className='grid grid-cols-1 gap-2 md:grid-cols-6 md:items-center'>
                  <FormLabel className='md:col-span-2 md:text-right'>
                    Slug
                  </FormLabel>
                  <div className='md:col-span-4'>
                    <FormControl>
                      <Input
                        placeholder='Product Slug'
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
                        placeholder='Type the description of the category'
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            {/* Price */}
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem className='grid grid-cols-1 gap-2 md:grid-cols-6 md:items-center'>
                  <FormLabel className='md:col-span-2 md:text-right'>
                    Price
                  </FormLabel>
                  <div className='md:col-span-4'>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Latest Price of the product'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='originalPrice'
              render={({ field }) => (
                <FormItem className='grid grid-cols-1 gap-2 md:grid-cols-6 md:items-center'>
                  <FormLabel className='md:col-span-2 md:text-right'>
                    Original Price
                  </FormLabel>
                  <div className='md:col-span-4'>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Previous price of the product'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='productCategoryId'
              render={({ field }) => (
                <FormItem className='grid grid-cols-1 gap-2 md:grid-cols-6 md:items-center'>
                  <FormLabel className='md:col-span-2 md:text-right'>
                    Category
                  </FormLabel>
                  <div className='md:col-span-4'>
                    <FormControl>
                      <Select
                        placeholder='Select a category for product'
                        options={[
                          { value: 'chocolate', label: 'Chocolate' },
                          { value: 'strawberry', label: 'Strawberry' },
                          { value: 'vanilla', label: 'Vanilla' },
                        ]}
                      />
                      {/* <Input
                        placeholder="Product Category"
                        autoComplete="off"
                        {...field}
                      /> */}
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='tags'
              render={({ field }) => (
                <FormItem className='grid grid-cols-1 gap-2 md:grid-cols-6 md:items-center'>
                  <FormLabel className='md:col-span-2 md:text-right'>
                    Tags
                  </FormLabel>
                  <div className='md:col-span-4'>
                    <FormControl>
                      <Select
                        placeholder='Select tags for the product'
                        name='tags'
                        isMulti
                        options={[
                          { value: 'chocolate', label: 'Chocolate' },
                          { value: 'strawberry', label: 'Strawberry' },
                          { value: 'vanilla', label: 'Vanilla' },
                        ]}
                      />
                      {/* <Input
                        placeholder="Product Category"
                        autoComplete="off"
                        {...field}
                      /> */}
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='stock'
              render={({ field }) => (
                <FormItem className='grid grid-cols-1 gap-2 md:grid-cols-6 md:items-center'>
                  <FormLabel className='md:col-span-2 md:text-right'>
                    Stock
                  </FormLabel>
                  <div className='md:col-span-4'>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Number of available Stock of the Product'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            {/* Image */}
            <FormField
              control={form.control}
              name='images'
              render={({ field }) => (
                <FormItem className='grid grid-cols-1 gap-2 md:grid-cols-6 md:items-start'>
                  <FormLabel className='md:col-span-2 md:text-right'>
                    Images
                  </FormLabel>

                  <div className='space-y-3 md:col-span-4'>
                    <FormControl>
                      <Input
                        multiple
                        type='file'
                        accept='image/*'
                        name={field.name}
                        ref={field.ref}
                        onChange={(e) => {
                          const files = e.target.files
                          if (files) {
                            field.onChange(Array.from(files))
                          }
                        }}
                      />
                    </FormControl>

                    {/* {previewImage && (
                      <img
                        src={previewImage}
                        className="h-40 w-full rounded-md object-cover border"
                      />
                    )} */}

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {previewImages.length > 0 && (
              <div className='grid grid-cols-1 gap-2 md:grid-cols-6 md:items-start'>
                {previewImages.map((item) => {
                  return (
                    <ImageThumbnail
                      key={item}
                      src={item}
                      className='md:col-span-2 md:text-right'
                    />
                  )
                })}
              </div>
            )}
            {/* <div className='grid grid-cols-1 gap-2 md:grid-cols-6 md:items-start'>
              <ImageThumbnail
                src='https://picsum.photos/300/200'
                className='md:col-span-2 md:text-right'
              />
              <ImageThumbnail
                src='https://picsum.photos/300'
                className='md:col-span-2 md:text-right'
              />
              <ImageThumbnail
                src='https://picsum.photos/300/200'
                className='md:col-span-2 md:text-right'
              />
            </div> */}

            {/* Actions */}
            <div className='flex justify-end pt-4'>
              <Button type='submit'>Add Product</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
