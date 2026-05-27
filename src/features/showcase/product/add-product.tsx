import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QueryKey } from '@/Types/appEnums'
import AsyncSelect from 'react-select/async'
import { getSelectedCompanyId, showAppLoader } from '@/stores/actions/app-actions'
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
import { getAllProductCategoryList } from '@/api/showcase/product-category.service'
import { getAllProductTagList } from '@/api/showcase/product-tag.service'
import { getReactSelectLoadOptions, mapDataToSelectOption } from '@/lib/react-select-option-handler'
import { createProduct } from '@/api/showcase/product.service'
import { toast } from 'sonner'
import { type CreateProductDTO } from '@/Types/request/showcase-request'
import { defaultAddProductForm } from './product.constants'
import { type AddProductForm, addProductformSchema } from './product.types'
import { getRouteApi } from '@tanstack/react-router'


const route = getRouteApi('/_authenticated/showcase/product/add')



export default function AddProduct() {

  const navigate = route.useNavigate()
  const form = useForm<AddProductForm>({
    resolver: zodResolver(addProductformSchema),
    defaultValues: defaultAddProductForm()
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
  const categoryWatcher = form.watch("productCategoryId")

  const { data: categoryList, isLoading: categoriesLoading } = useQuery({
    queryKey: [QueryKey.LIST_PRODUCT_CATEGORY_ALL],
    queryFn: () => getAllProductCategoryList(getSelectedCompanyId()),
  })


  const { data: tagList, isLoading: tagsLoading } = useQuery({
    queryKey: [QueryKey.LIST_PRODUCT_TAG_ALL],
    queryFn: () => getAllProductTagList(getSelectedCompanyId()),
  })


  const categoryLoadOptions = getReactSelectLoadOptions(categoryList?.data || [])
  const defaultCategoryOptions = mapDataToSelectOption(categoryList?.data || [])
  const tagLoadOptions = getReactSelectLoadOptions(tagList?.data || []);
  const defaultTagOptions = mapDataToSelectOption(tagList?.data || []);


  const onSubmit = (values: AddProductForm) => {

    const companyId = getSelectedCompanyId();
    const productCategoryId = values.productCategoryId.value;
    const tags = values?.tags?.map(item => item.value);
    const data: CreateProductDTO = { ...values, companyId, productCategoryId, tags };
    productAddMutation.mutate({ data })
    // console.log("submit",values)
    // console.log(form);
  }


  const queryClient = useQueryClient();


  const productAddMutation = useMutation({
    mutationFn: createProduct,
    onMutate: () => { showAppLoader(true) },
    onSettled: () => { showAppLoader(false) },
    onSuccess: () => {
      // closeShowcaseDialog();
      form.reset(defaultAddProductForm());
      navigate({
        to: "/showcase/product",
      })
      toast.success("Product added Successfully !!!");
      queryClient.invalidateQueries({
        queryKey: [QueryKey.LIST_PRODUCT]
      });
      // setSelectedProductCategoryRow(null)
    }
  });




  useEffect(() => {
    const cat = form.getValues("productCategoryId")
  }, [categoryWatcher])

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
                        {...field}
                        type='number'
                        placeholder='Latest Price of the product'
                        autoComplete='off'
                        onChange={(event) => field.onChange(Number(event.target.value))}
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
                        onChange={(event) => field.onChange(Number(event.target.value))}
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
                      <AsyncSelect cacheOptions loadOptions={categoryLoadOptions} defaultOptions={defaultCategoryOptions} {...field} />
                      {/* <Select
                        placeholder='Select a category for product'
                        {...field}
                        options={
                          categoryList?.data.map(item=>({
                            Value:item._id,
                            label:item.name
                          }))
                        }

                        options={[
                          { value: 'chocolate', label: 'Chocolate' },
                          { value: 'strawberry', label: 'Strawberry' },
                          { value: 'vanilla', label: 'Vanilla' },
                        ]}

                        options={categoryList}
                      /> */}
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
                      <AsyncSelect
                        isMulti
                        cacheOptions
                        loadOptions={tagLoadOptions}
                        defaultOptions={defaultTagOptions}
                        {...field}
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
                        onChange={(event) => field.onChange(Number(event.target.value))}
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
              <Button type='submit'>Create Product</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
