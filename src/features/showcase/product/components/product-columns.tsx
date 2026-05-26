import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import moment from 'moment'
import { ProductTableRowActions } from './product-table-row-actions'
import type{ IProduct } from '@/Types/entities/showcase-entities'

export const productColumns: ColumnDef<IProduct>[] = [
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
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Price' />
    ),
    cell: ({ row }) => {
      return <LongText className='max-w-36'>{row.getValue("price")}</LongText>
    },
    // meta: { className: 'w-36' },
    enableSorting:false,
  },
  {
    accessorKey: 'originalPrice',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Original Price' />
    ),
    cell: ({ row }) => {
      return <LongText className='max-w-36'>{row.getValue("originalPrice")}</LongText>
    },
    // meta: { className: 'w-36' },
    enableSorting:false,
  },
  {
    accessorKey: 'productCategory',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ row }) => {
      // return <LongText className='max-w-36'>{row.getValue("productCategory")?.name}</LongText>
      return <LongText className='max-w-36'>{row.original?.productCategory?.name}</LongText>
    },
    // meta: { className: 'w-36' },
    enableSorting:false,
  },
  {
    accessorKey: 'tags',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tags' />
    ),
    cell: ({ row }) => {
      // return <LongText className='max-w-36'>{row.getValue("productCategory")?.name}</LongText>
      return <LongText className='max-w-36'>
        {row.original?.tags.map(item=>item.name).join(", ")}
        </LongText>
    },
    // meta: { className: 'w-36' },
    enableSorting:false,
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Stock Available' />
    ),
    cell: ({ row }) => {
      // return <LongText className='max-w-36'>{row.getValue("productCategory")?.name}</LongText>
      return <LongText className='max-w-36'>
        {row.original.stock}
        </LongText>
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
      cell: ProductTableRowActions,
  },
]
