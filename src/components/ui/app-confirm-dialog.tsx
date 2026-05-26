

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useConfirmStore } from '@/stores/confirm-store'


export function AppConfirmDialog() {
    const { open, options, resolve } = useConfirmStore()

    if (!open) return null
  return (
    <AlertDialog open = {open}>
      <AlertDialogContent>
        <AlertDialogHeader className='text-start'>
          <AlertDialogTitle>{options?.title}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>{options?.description}</div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* {children} */}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={()=>{resolve(false)}}>
            {options?.cancelText ?? 'Cancel'}
          </AlertDialogCancel>
          <Button
            onClick={()=>(resolve(true))}
            variant={options?.destructive ? 'destructive' : 'default'}
          >
            {options?.confirmText ?? 'Confirm'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
