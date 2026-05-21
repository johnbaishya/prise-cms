'use client'

import { z } from 'zod'
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
import { updateProductCategory } from '@/api/showcase/product-category.service'
import { AlertDialog, AlertDialogOverlay } from '@/components/ui/alert-dialog'
import { showAppLoader } from '@/stores/actions/app-actions'
import { toast } from 'sonner'
import { QueryKey } from '@/Types/appEnums'
import { updateProductCategoryDTO } from '@/Types/request/showcase-request'
import { useShowcaseStore } from '@/stores/showcase-store'
import { closeShowcaseDialog, resetCategoryDialogs } from '@/stores/actions/showcase-actions'
import { Textarea } from '@/components/ui/textarea'
import { LongText } from '@/components/long-text'

const formSchema = z
  .object({
    name: z.string().min(1, 'Name is required.'),
    slug: z.string().min(1, 'slug is required'),
    description: z.string().optional(),
    isEdit: z.boolean(),
  });
type UserForm = z.infer<typeof formSchema>

type UserActionDialogProps = {
  currentRow?: IProductCategory
  open: boolean
  onOpenChange: (open: boolean) => void
}




export function ProductCategoryDetailDialog({
  currentRow,
  open,
  onOpenChange,
}: UserActionDialogProps) {
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
        },
  })

  const selectedRow = useShowcaseStore(state=>state.selectedCategoryRow);

  const onSubmit = (values: UserForm) => {
    // form.reset()
    // showSubmittedData(values)
    // onOpenChange(false)
    console.log(values)
    productCategoryMutation.mutate({data:values,categoryId: selectedRow?._id as string})
  }

  const queryClient = useQueryClient();
  const productCategoryMutation = useMutation({
  mutationFn:updateProductCategory,
  onMutate:()=>{showAppLoader(true)},
  onSettled:()=>{showAppLoader(false)},
  onSuccess:()=>{
    closeShowcaseDialog();
    form.reset();
    toast.success("Category Updated Successfully !!!");
    queryClient.invalidateQueries({
      queryKey:[QueryKey.LIST_PRODUCT_CATEGORY]
    })
  }
  
});


  return (
    <Dialog
      open={open}
      onOpenChange={(status) => {
        if(!status){
          form.reset()
          resetCategoryDialogs();

        }
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>Category Detail</DialogTitle>
        </DialogHeader>
        <div className='h-105 w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3'>
          <Form {...form}>
            <form
              id='category-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 px-0.5'
            >
              <div className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
              <img className='col-span-3' src={selectedRow?.image as string}/>
              </div>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end text-gray-400'>
                      Name
                    </FormLabel>
                    <FormControl>
                      {/* <Input
                        disabled
                        placeholder='Category Name'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      /> */}
                      <p className='col-span-4'>{selectedRow?.name}</p>
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
                   <FormLabel className='col-span-2 text-end text-gray-400'>
                      Slug
                    </FormLabel>
                    <FormControl>
                      {/* <Input
                      disabled
                        placeholder='Category Slug'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      /> */}
                       <p className='col-span-4'>{selectedRow?.slug}</p>
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    {/* <p className='col-span-4 overflow-y-auto'>
                      {selectedRow?.description}
                      </p> */}
                    <FormLabel className='col-span-2 text-end text-gray-400'>
                      Description :
                    </FormLabel>
                    <FormControl>
                      
                      {/* <Textarea
                        placeholder='Type the description of the category'
                        className='col-span-6 overflow-y-auto'
                        {...field}
                        disabled
                        // rows={2}
                        
                      /> */}
                    </FormControl>
                     <p className='col-span-6'>{selectedRow?.description}</p>
                    {/* <FormMessage className='col-span-4 col-start-3' /> */}
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        {/* <DialogFooter>
          <Button type='submit' form='category-form'>
            Save changes
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
