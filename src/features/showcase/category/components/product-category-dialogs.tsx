import { useShowcaseStore } from '@/stores/showcase-store'
import { ProductCategoryActionDialog } from './product-category-action-dialog'
import { ProductCategoryDeleteDialog } from './product-category-delete-dialog'
import { UsersInviteDialog } from './users-invite-dialog'
import { openShowcaseDialog, setSelectedProductCategoryRow } from '@/stores/actions/showcase-actions'
import { ProductCategoryDetailDialog } from './product-category-detail-dialog'
// import { useUsers } from '@/features/users/components/users-provider'

export function ProductCategoryDialogs() {
  // const { open, setOpen, currentRow, setCurrentRow } = useUsers()
  const {productCategoryDialog,selectedCategoryRow} = useShowcaseStore(state=>state)
  return (
    <>
      <ProductCategoryActionDialog
        key='category-add'
        open={productCategoryDialog === 'add'}
        onOpenChange={
          // () => setOpen('add')
          () => openShowcaseDialog("add")
        }
      />

      {/* <UsersInviteDialog
        key='user-invite'
        open={open === 'invite'}
        onOpenChange={() => setOpen('invite')}
      /> */}

      {selectedCategoryRow && (
        <>
          <ProductCategoryActionDialog
            key={`category-edit-${selectedCategoryRow._id}`}
            open={productCategoryDialog === 'edit'}
            onOpenChange={() => {
              // setOpen('edit')
              openShowcaseDialog("edit")
              setSelectedProductCategoryRow(null)
              setTimeout(() => {
              }, 500)
            }}
            currentRow={selectedCategoryRow}
          />

          <ProductCategoryDetailDialog
            key={`category-detail-${selectedCategoryRow._id}`}
            open={productCategoryDialog === 'view'}
            onOpenChange={(data) => {
              openShowcaseDialog("view")
              setTimeout(() => {
                setSelectedProductCategoryRow(null)
              }, 500)
            }}
            currentRow={selectedCategoryRow}
          />

          <ProductCategoryDeleteDialog
            key={`user-delete-${selectedCategoryRow._id}`}
            open={productCategoryDialog === 'delete'}
            onOpenChange={() => {
              // setOpen('delete')
              openShowcaseDialog("delete");
              setSelectedProductCategoryRow(null)
              // setTimeout(() => {
              // }, 500)
            }}
            currentRow={selectedCategoryRow}
          />
        </>
      )}
    </>
  )
}
