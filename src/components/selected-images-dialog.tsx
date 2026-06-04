import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import { ImageThumbnail } from "./ui/image-thumbnail";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

type PropTypes = {
    open?: boolean,
    images?: File[],
    onSubmit?: () => void,
    onClose?: (state: boolean) => void,
    confirmText?: string,
}


export const SelectedImagesDialog = (props: PropTypes) => {
    const { open, images, onSubmit, onClose, confirmText = "save" } = props;
    const [previewImages, setPreviewImages] = useState<string[]>([])

    const handleImagePreview = () => {
        if (Array.isArray(images)) {
            const imageUrlArray = images.map((item) => {
                const imgUri: string = URL.createObjectURL(item)
                return imgUri
            })

            setPreviewImages(imageUrlArray)
        }
    }

    useEffect(() => {
        handleImagePreview()
    }, [images]);

    return (
        <Dialog
            open={open}
            onOpenChange={(state) => {
                if (onClose) {
                    onClose(state)
                }
            }}
        >
            <DialogContent className="max-h-[85vh] overflow-y-auto">
                <DialogHeader className='text-start'>
                    <DialogTitle className="text-xl font-bold" >
                        Selected Images
                    </DialogTitle>
                </DialogHeader>
                <div className='grid grid-cols-1 gap-2 md:grid-cols-6 md:items-start'>
                    {
                        previewImages.map(item => (
                            <ImageThumbnail className='md:col-span-2 md:text-right' src={item} />
                        ))
                    }
                </div>
                <DialogFooter>
                    <Button onClick={onSubmit} >
                        {confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}