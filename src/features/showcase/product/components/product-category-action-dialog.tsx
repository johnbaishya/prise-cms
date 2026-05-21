'use client'

import { url, z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { IProductCategory } from '@/Types/entities/showcase-entities'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { createProductCategory, updateProductCategory } from '@/api/showcase/product-category.service'
import { AlertDialog, AlertDialogOverlay } from '@/components/ui/alert-dialog'
import { getSelectedCompanyId, showAppLoader } from '@/stores/actions/app-actions'
import { toast } from 'sonner'
import { QueryKey } from '@/Types/appEnums'
import { createProductCategoryDTO, updateProductCategoryDTO } from '@/Types/request/showcase-request'
import { useShowcaseStore } from '@/stores/showcase-store'
import { closeShowcaseDialog, resetCategoryDialogs, setSelectedProductCategoryRow } from '@/stores/actions/showcase-actions'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'

const formSchema = z
  .object({
    name: z.string().min(1, 'Name is required.'),
    slug: z.string().min(1, 'slug is required'),
    image: z.union([z.string(),z.instanceof(File)]),
    description: z.string().optional(),
    isEdit: z.boolean(),
  });
type UserForm = z.infer<typeof formSchema>

type ProductCategoryActionDialogProps = {
  currentRow?: IProductCategory
  open: boolean
  onOpenChange: (open: boolean) => void
}




export function ProductCategoryActionDialog({
  currentRow,
  open,
  onOpenChange,
}: ProductCategoryActionDialogProps) {
  const isEdit = !!currentRow
  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          isEdit,
        }
      : {
          name: '',
          slug: '',
          description: '',
          isEdit,
          image:undefined
        },
  })

  const [previewImage,setPreviewImage] = useState<string>("");

  const handleImagePreview = ()=>{
    const image = form.getValues("image");
    if(image instanceof(File)){
      let imgUri:string = URL.createObjectURL(image); 
      setPreviewImage(imgUri);
    }else{
      setPreviewImage(image)
    }
  }




  const selectedRow = useShowcaseStore(state=>state.selectedCategoryRow);



  const onSubmit = (values: UserForm) => {
    const {name,slug,description,image} = values;
    const base = {name,slug,description}
    const imageFile = image instanceof File ? image : undefined
    
   if(isEdit){

      updateProductCategoryMutation.mutate({
        data:{ 
          ...base,
          ...(imageFile && { image: imageFile }),
        },
        categoryId: selectedRow?._id as string
      })

      return;
   }

    createProductCategoryMutation.mutate({
      data:{
        ...base,
        companyId:getSelectedCompanyId(),
        ...(imageFile && { image: imageFile })
      }
    })

  }

  

  const queryClient = useQueryClient();


  const updateProductCategoryMutation = useMutation({
  mutationFn:updateProductCategory,
  onMutate:()=>{showAppLoader(true)},
  onSettled:()=>{showAppLoader(false)},
  onSuccess:()=>{
    closeShowcaseDialog();
    toast.success("Category Updated Successfully !!!");
    queryClient.invalidateQueries({
      queryKey:[QueryKey.LIST_PRODUCT_CATEGORY]
    });
    setSelectedProductCategoryRow(null)
  }
});





const createProductCategoryMutation = useMutation({
  mutationFn:createProductCategory,
  onMutate:()=>{showAppLoader(true)},
  onSettled:()=>{showAppLoader(false)},
  onSuccess:()=>{
    closeShowcaseDialog();
    form.reset();
    toast.success("Category Added Successfully !!!");
    queryClient.invalidateQueries({
      queryKey:[QueryKey.LIST_PRODUCT_CATEGORY]
    })
  }
})

const imageInputWatcher = form.watch("image");

useEffect(()=>{
  handleImagePreview()
},[imageInputWatcher])


  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if(!state){
          form.reset()
          resetCategoryDialogs();
          // onOpenChange(state)

        }
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>{isEdit ? 'Edit Category' : 'Add New Category'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the category here. ' : 'Create new category here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='h-105 w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3'>
          <Form {...form}>
            <form
              id='category-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 px-0.5'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Category Name'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='slug'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      Slug
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Category Slug'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='image'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      Image
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='file'
                        accept="image/*"
                        className='col-span-4'
                        autoComplete='off'
                        name={field.name}
                        ref={field.ref}
                        // {...field}
                        onChange={e=>{
                          const file = e.target.files?.[0]

                          if (file) {
                            field.onChange(file) // 👈 store actual File object in form state
                          }
                        }}
                      />
                    </FormControl>
                      <img 
                      className='col-span-6'
                      src={previewImage}/>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Type the description of the category'
                        className='col-span-4 overflow-y-auto'
                        {...field}
                        rows={2}
                        
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='category-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
