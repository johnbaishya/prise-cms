import { MailPlus, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { openShowcaseDialog } from '@/stores/actions/showcase-actions'
// import { useUsers } from './category-provider'
import { type NavigateFn,} from "@tanstack/react-router"


type PropType = {
  navigate:NavigateFn
}

export function ProductPrimaryButtons({navigate}:PropType) {
  // const { setOpen } = useUsers()
  return (
    <div className='flex gap-2'>
      {/* <Button
        variant='outline'
        className='space-x-1'
        // onClick={() => setOpen('invite')}
      >
        <span>Invite User</span> <MailPlus size={18} />
      </Button> */}
      <Button className='space-x-1' 
      onClick={()=>{
        // openShowcaseDialog("add");
        navigate({to:"/showcase/product/add"})
      }}
      >
        <span>Add New Product</span> <UserPlus size={18} />
      </Button>
    </div>
  )
}
