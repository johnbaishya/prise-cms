import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import moment from 'moment'
import { DataTableRowActions } from './data-table-row-actions'
import { IProductCategory } from '@/Types/entities/showcase-entities'

export const productColumns: ColumnDef<IProductCategory>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => (
      <LongText 
      className='max-w-36 ps-3'
      >
        {row.getValue('name')}
      </LongText>
    ),
    // meta: {
    //   className: cn(
    //     'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
    //     'inset-s-6 ps-0.5 max-md:sticky @4xl/content:table-cell @4xl/content:drop-shadow-none'
    //   ),
    // },
    // meta: { className: 'w-36' },
    enableHiding: false,
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Slug' />
    ),
    cell: ({ row }) => {
      return <LongText className='max-w-36'>{row.getValue("slug")}</LongText>
    },
    // meta: { className: 'w-36' },
    enableSorting:false,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    cell: ({ row }) => {
      return <LongText className='max-w-36'>{row.getValue("description")}</LongText>
    },
    // meta: { className: 'w-36' },
    enableSorting:false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created At' />
    ),
    cell: ({ row }) => {
      const createdDate = row.getValue("createdAt") as string;
      const formatedDate = createdDate?moment(createdDate)
  .format('DD MMM YYYY'):"";
      return <LongText className='max-w-36'>{formatedDate}</LongText>
    },
    // meta: { className: 'w-36' },
  },
  {
      id: 'actions',
      header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Actions' />
    ),
      cell: DataTableRowActions,
  },
]
