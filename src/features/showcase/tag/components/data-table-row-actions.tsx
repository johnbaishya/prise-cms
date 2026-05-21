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
import { openProductTagDialog, openShowcaseDialog, setSelectedProductCategoryRow, setSelectedProductTagRow, updateShowcaseState } from '@/stores/actions/showcase-actions'
import { IProductCategory } from '@/Types/entities/showcase-entities'

type DataTableRowActionsProps = {
  row: Row<IProductCategory>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
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
              setSelectedProductTagRow(row.original);
              openProductTagDialog("view")

            }}
          >
            View
            <DropdownMenuShortcut>
              <Info size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setSelectedProductTagRow(row.original);
              openProductTagDialog("edit")
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
              // setCurrentRow(row.original)
              // setOpen('delete')
              setSelectedProductTagRow(row.original);
              openProductTagDialog("delete")
              
              // updateShowcaseState({
              //   productCategoryDialog:"delete"
              // })
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
