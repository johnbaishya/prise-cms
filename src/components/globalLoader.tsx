import { useAppStore } from "@/stores/app-store"
import { AlertDialog, AlertDialogContent } from "./ui/alert-dialog"
import { ThreeDots } from "react-loader-spinner"

const GlobalLoader = ()=>{

    const loader = useAppStore(state=>state.loader) 
    return(
        <AlertDialog open={loader}>
            <AlertDialogContent  title="Loading">
                <div className='flex items-center justify-center'>
                    <ThreeDots
                        visible={true}
                        // height="80"
                        width="80"
                        color="#000"
                        radius="4"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        />

                </div>
                
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default GlobalLoader;