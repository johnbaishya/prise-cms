import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type Row } from '@tanstack/react-table'
import { Info, Trash2, UserPen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useShowcaseStore } from '@/stores/showcase-store'
import { openShowcaseDialog, setSelectedProductCategoryRow, setSelectedProductRow, updateShowcaseState } from '@/stores/actions/showcase-actions'
import type { IProduct } from '@/Types/entities/showcase-entities'
import { getRouteApi } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProduct } from '@/api/showcase/product.service'
import { showAppLoader, showConfirmDialog } from '@/stores/actions/app-actions'
import { QueryKey } from '@/Types/appEnums'
import { toast } from 'sonner'

type DataTableRowActionsProps = {
  row: Row<IProduct>
}




const route = getRouteApi('/_authenticated/showcase/product/')

export function ProductTableRowActions({ row }: DataTableRowActionsProps) {
  const navigate = route.useNavigate()

  const handleDeleteProduct = async (row: IProduct) => {
    const deleteAccess = await showConfirmDialog({
      title: "Delete ?",
      description: "Are you sure want to delete the product " + row.name,
      cancelText: "Cancel",
      confirmText: "Delete",
      destructive: true
    });
    if (deleteAccess) {
      deleteProductMutation.mutate({ id: row._id });
    }
  }

  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onMutate: () => { showAppLoader(true) },
    onSettled: () => { showAppLoader(false) },
    onSuccess: () => {
      navigate({
        to: "/showcase/product",
      })
      toast.success("Product deleted Successfully !!!");
      queryClient.invalidateQueries({
        queryKey: [QueryKey.LIST_PRODUCT]
      });
      // setSelectedProductCategoryRow(null)
    }
  });
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-40'>
          <DropdownMenuItem
            onClick={() => {
              setSelectedProductRow(row.original)
              navigate({
                to: "/showcase/product/view"
              })
            }}
          >
            View
            <DropdownMenuShortcut>
              <Info size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setSelectedProductRow(row.original)
              navigate({
                to: "/showcase/product/edit"
              })
            }}
          >
            Edit
            <DropdownMenuShortcut>
              <UserPen size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {

              // setSelectedProductCategoryRow(row.original)
              // openShowcaseDialog("delete");
              handleDeleteProduct(row.original);
            }}
            className='text-red-500!'
          >
            Delete
            <DropdownMenuShortcut>
              <Trash2 size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
