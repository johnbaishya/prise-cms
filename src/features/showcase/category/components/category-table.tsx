import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { QueryKey } from '@/Types/appEnums'
import type {
  ListProductCategoryQueryDTO,
  ProductCategorySortField,
} from '@/Types/request/showcase-request'
import { ThreeDots } from 'react-loader-spinner'
import { getProductCategoryList } from '@/api/showcase/product-category.service'
import { getSelectedCompanyId } from '@/stores/actions/app-actions'
import { cn } from '@/lib/utils'
import { type NavigateFn } from '@/hooks/use-table-url-state'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination, DataTableToolbar } from '@/components/data-table'
import { categoryColumns as columns } from './category-columns'

type DataTableProps = {
  // data: Category[]
  // search: Record<string, unknown>
  navigate: NavigateFn
}

export function CategoryTable({ navigate }: DataTableProps) {
  // Local UI-only states
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [searchInput, setSearchInput] = useState('')
  const [query, setQuery] = useState<ListProductCategoryQueryDTO>({
    search: '',
    page: 1,
    limit: 10,
  })

  const { data: tableData, isLoading } = useQuery({
    queryKey: [QueryKey.LIST_PRODUCT_CATEGORY, query],
    queryFn: () => getProductCategoryList(query, getSelectedCompanyId()),
  })

  const updateQuery = (newData: Partial<ListProductCategoryQueryDTO>) => {
    setQuery((prev) => {
      return {
        ...prev,
        ...newData,
      }
    })
  }

  // Local state management for table (uncomment to use local-only state, not synced with URL)
  // const [columnFilters, onColumnFiltersChange] = useState<ColumnFiltersState>([])
  // const [pagination, onPaginationChange] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })

  // Synced with URL states (keys/defaults mirror users route search schema)

  // const {
  //   columnFilters,
  //   onColumnFiltersChange,
  //   pagination,
  //   onPaginationChange,
  //   ensurePageInRange,
  // } = useTableUrlState({
  //   search,
  //   navigate,
  //   pagination: { defaultPage: 1, defaultPageSize: 10 },
  //   globalFilter: { enabled: false },
  //   columnFilters: [
  //     // username per-column text filter
  //     { columnId: 'username', searchKey: 'username', type: 'string' },
  //     { columnId: 'status', searchKey: 'status', type: 'array' },
  //     { columnId: 'role', searchKey: 'role', type: 'array' },
  //   ],
  // })

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: tableData?.data || [],
    columns,
    state: {
      sorting,
      pagination,
      // rowSelection,
      // columnFilters,
      columnVisibility,
    },
    enableRowSelection: true,
    onPaginationChange: setPagination,
    // onColumnFiltersChange,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    pageCount: tableData?.meta?.totalPages ?? 0,
    manualSorting: true,
  })

  // useEffect(() => {
  //   ensurePageInRange(table.getPageCount())
  // }, [table, ensurePageInRange])

  useEffect(() => {
    updateQuery({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      search: searchInput,
      sortBy: (sorting.length ? sorting[0].id : undefined) as
        | ProductCategorySortField
        | undefined,
      order: sorting.length ? (sorting[0].desc ? 'desc' : 'asc') : undefined,
    })
  }, [pagination, sorting, searchInput])

  return (
    <div
      className={cn(
        'max-sm:has-[div[role="toolbar"]]:mb-16', // Add margin bottom to the table on mobile when the toolbar is visible
        'flex flex-1 flex-col gap-4'
      )}
    >
      <DataTableToolbar
        table={table}
        searchPlaceholder='Filter Category...'
        searchKey='name'
        // filters={[
        //   {
        //     columnId: 'status',
        //     title: 'Status',
        //     options: [
        //       { label: 'Active', value: 'active' },
        //       { label: 'Inactive', value: 'inactive' },
        //       { label: 'Invited', value: 'invited' },
        //       { label: 'Suspended', value: 'suspended' },
        //     ],
        //   },
        //   {
        //     columnId: 'role',
        //     title: 'Role',
        //     options: roles.map((role) => ({ ...role })),
        //   },
        // ]}
        onSearch={(data) => {
          // updateQuery({search:data})
          setSearchInput(data)
        }}
      />
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='group/row'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                        header.column.columnDef.meta?.className,
                        header.column.columnDef.meta?.thClassName
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 items-center justify-center text-center'
                >
                  <div className='flex items-center justify-center'>
                    <ThreeDots
                      visible={true}
                      // height="80"
                      width='80'
                      color='#000'
                      radius='4'
                      ariaLabel='three-dots-loading'
                      wrapperStyle={{}}
                      wrapperClass=''
                    />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className='group/row'
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                            cell.column.columnDef.meta?.className,
                            cell.column.columnDef.meta?.tdClassName
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className='h-24 text-center'
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} className='mt-auto' />
      {/* <DataTableBulkActions table={table} /> */}
    </div>
  )
}
