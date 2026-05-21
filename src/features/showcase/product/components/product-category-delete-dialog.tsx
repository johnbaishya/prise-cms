'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { IProductCategory } from '@/Types/entities/showcase-entities'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProductCategory } from '@/api/showcase/product-category.service'
import { showAppLoader } from '@/stores/actions/app-actions'
import { closeShowcaseDialog } from '@/stores/actions/showcase-actions'
import { toast } from 'sonner'
import { QueryKey } from '@/Types/appEnums'
import { useShowcaseStore } from '@/stores/showcase-store'

type UserDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: IProductCategory
}


export function ProductCategoryDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: UserDeleteDialogProps) {
  const [value, setValue] = useState('')
  const {selectedCategoryRow} = useShowcaseStore(state=>state)
  const handleDelete = () => {
    // if (value.trim() !== currentRow.name) return

    // onOpenChange(false)
    // showSubmittedData(currentRow, 'The following user has been deleted:')
    if(!!selectedCategoryRow){
      categoryDeleteMutation.mutate({id:selectedCategoryRow._id})
    }
  }


  const queryClient = useQueryClient();

const categoryDeleteMutation = useMutation({
  mutationFn:deleteProductCategory,
  onMutate:()=>{showAppLoader(true)},
  onSettled:()=>{showAppLoader(false)},
  onSuccess:()=>{
    closeShowcaseDialog();
    toast.success("Category deleted Successfully !!!");
    queryClient.invalidateQueries({
      queryKey:[QueryKey.LIST_PRODUCT_CATEGORY]
    })
  },
  onError:()=>{
    toast.error("error while deleting category")
  }
})


  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      form='users-delete-form'
      disabled={!selectedCategoryRow}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Delete Category
        </span>
      }
      desc={
        <form
          id='users-delete-form'
          onSubmit={(e) => {
            e.preventDefault()
            handleDelete()
          }}
          className='space-y-4'
        >
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{currentRow.name}</span>?
            <br />
            This action will permanently remove the Category with name{' '}
            <span className='font-bold'>
              {currentRow.name}
            </span>{' '}
            from the system. This cannot be undone.
          </p>

          {/* <Label className='my-2'>
            Username:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter username to confirm deletion.'
              autoFocus
            />
          </Label> */}

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be careful, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </form>
      }
      confirmText='Delete'
      destructive
    />
  )
}
