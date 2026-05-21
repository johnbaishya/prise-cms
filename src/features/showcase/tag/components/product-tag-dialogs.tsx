import { useShowcaseStore } from '@/stores/showcase-store'
import { ProductTagActionDialog } from './product-tag-action-dialog'
import { ProductTagDeleteDialog } from './product-tag-delete-dialog'
import { UsersInviteDialog } from './users-invite-dialog'
import { openShowcaseDialog, setSelectedProductCategoryRow } from '@/stores/actions/showcase-actions'
import { ProductTagDetailDialog } from './product-tag-detail-dialog'
// import { useUsers } from '@/features/users/components/users-provider'

export function ProductTagDialogs() {
  // const { open, setOpen, currentRow, setCurrentRow } = useUsers()
  const {productTagDialog,selectedProductTagRow} = useShowcaseStore(state=>state)
  return (
    <>
      <ProductTagActionDialog
        key='category-add'
        open={productTagDialog === 'add'}
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

      {selectedProductTagRow && (
        <>
          <ProductTagActionDialog
            key={`category-edit-${selectedProductTagRow._id}`}
            open={productTagDialog === 'edit'}
            onOpenChange={() => {
              // setOpen('edit')
              openShowcaseDialog("edit")
              setSelectedProductCategoryRow(null)
              setTimeout(() => {
              }, 500)
            }}
            currentRow={selectedProductTagRow}
          />

          <ProductTagDetailDialog
            key={`category-detail-${selectedProductTagRow._id}`}
            open={productTagDialog === 'view'}
            onOpenChange={(data) => {
              console.log("data",data)
              // setOpen('edit')
              openShowcaseDialog("view")
              setTimeout(() => {
                setSelectedProductCategoryRow(null)
              }, 500)
            }}
            currentRow={selectedProductTagRow}
          />

          <ProductTagDeleteDialog
            key={`user-delete-${selectedProductTagRow._id}`}
            open={productTagDialog === 'delete'}
            onOpenChange={() => {
              // setOpen('delete')
              // openShowcaseDialog("delete");
              // setSelectedProductCategoryRow(null)
              // setTimeout(() => {
              // }, 500)
            }}
            currentRow={selectedProductTagRow}
          />
        </>
      )}
    </>
  )
}
