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
import { Header } from '@/components/layout/header'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { ProfileDropdown } from '@/components/profile-dropdown'


const route = getRouteApi('/_authenticated/showcase/product/add')



export default function EditProduct() {

  const navigate = route.useNavigate()
  const { selectedProductRow } = useShowcaseStore(state => state)
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const form = useForm<EditProductForm>({
    resolver: zodResolver(addProductformSchema),
    defaultValues: selectedProductRow ? mapProductToForm(selectedProductRow) : defaultAddProductForm(),
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

  const { data: galleryData, isLoading: galleryLoading } = useQuery({
    queryKey: [QueryKey.LIST_PRODUCT_GALLERY, selectedProductRow?._id],
    queryFn: () => getProductGallery({ id: selectedProductRow?._id })
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
    editProductMutation.mutate({ data, productId: selectedProductRow?._id })
    // console.log("submit",values)
    // console.log(form);
  }


  const queryClient = useQueryClient();


  const editProductMutation = useMutation({
    mutationFn: updateProduct,
    onMutate: () => { showAppLoader(true) },
    onSettled: () => { showAppLoader(false) },
    onSuccess: () => {
      // closeShowcaseDialog();
      form.reset(defaultAddProductForm());
      navigate({
        to: "/showcase/product",
      })
      toast.success("Product updated Successfully !!!");
      queryClient.invalidateQueries({
        queryKey: [QueryKey.LIST_PRODUCT]
      });
      // setSelectedProductCategoryRow(null)
    }
  });


  const galleryDeleteMutation = useMutation({
    mutationFn: deleteGalleryImage,
    onMutate: () => { showAppLoader(true) },
    onSettled: () => { showAppLoader(false) },
    onSuccess: () => {
      toast.success("image deleted Successfully !!!");
      queryClient.invalidateQueries({
        queryKey: [QueryKey.LIST_PRODUCT_GALLERY, selectedProductRow?._id]
      })
    }
  })



  const addProductGalleryMutation = useMutation({
    mutationFn: addProductGallery,
    onMutate: () => { showAppLoader(true) },
    onSettled: () => { showAppLoader(false) },
    onSuccess: (data) => {
      console.log(data);
      setSelectedImages([])
      toast.success("Images added Successfully !!!");
      queryClient.invalidateQueries({
        queryKey: [QueryKey.LIST_PRODUCT_GALLERY, selectedProductRow?._id]
      })
    }
  })




  const handleDeleteImage = async (image: IGallery) => {

    const access = await showConfirmDialog({
      title: "Delete Image ?",
      description: "Are you sure want to delete the image",
      confirmText: "Delete",
      cancelText: "Cancel",
      destructive: true
    });

    if (!access) {
      return;
    }

    console.log("start from here", image)
    galleryDeleteMutation.mutate({ id: image._id });
  }




  useEffect(() => {
    const cat = form.getValues("productCategoryId")
  }, [categoryWatcher])

  useEffect(() => {
    handleImagePreview()
  }, [imagesInputWatcher])


  return (
    <>
      <div className='mx-auto w-full max-w-2xl px-4 py-6'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-2xl font-semibold'>Edit Product</h1>
          <p className='text-sm text-muted-foreground'>
            Update Existing Product here.
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

              {/* Actions */}
              <div className='flex justify-end pt-4'>
                <Button type='submit'>Update Product</Button>
              </div>
            </form>
          </Form>
        </div>
        <Card className='mt-5'>
          <CardHeader>
            Product Images
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 gap-2 md:grid-cols-6 md:items-start'>
              {galleryLoading &&
                <>
                  <Skeleton className='md:col-span-2 md:text-right m-5 h-20' />
                  <Skeleton className='md:col-span-2 md:text-right m-5 h-20' />
                  <Skeleton className='md:col-span-2 md:text-right m-5 h-20' />
                </>
              }

              {
                galleryData?.map((item) => {
                  return (
                    <ImageThumbnail
                      data={item}
                      key={item.key}
                      src={item.location}
                      className='md:col-span-2 md:text-right border-2'
                      deletable
                      onDelete={(image) => {
                        handleDeleteImage(image)

                      }}
                    />
                  )
                })
              }
            </div>
          </CardContent>
          <CardFooter>
            <div className='flex justify-center pt-4 w-full'>
              <label for="file-upload" class="custom-file-upload" className={cn(buttonVariants({ variant: "outline", size: "default" }))} >
                Add More Images
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
          onClose={(state) => {
            setSelectedImages([])
          }}
          onSubmit={() => {
            if (!selectedProductRow?._id) return
            addProductGalleryMutation.mutate({ id: selectedProductRow?._id, images: selectedImages })
          }}
        />
      </div>
    </>
  )
}
