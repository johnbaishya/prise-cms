import { Trash } from 'lucide-react'
import { Button } from './button'
import { Card, CardContent } from './card'

type ImageThumbnailProps = {
  src?: string
  className?: string
  style?: StylePropertyMap
  imageStyle?: StylePropertyMap
  size?: number
  deletable?: boolean
  onDelete?: () => void
}

export const ImageThumbnail = (props: ImageThumbnailProps) => {
  const { src, className, style, size = 400, deletable, onDelete } = props
  return (
    <div className={className} style={{ position: 'relative' }}>
      {deletable && (
        <Button
          className='bg-red-500'
          style={{ position: 'absolute', top: 5, right: 5 }}
          size={'sm'}
          onClick={(e) => {
            e.preventDefault()
            if (onDelete) {
              onDelete()
            }
          }}
        >
          <Trash />
        </Button>
      )}
      <img
        src={src ? src : 'https://picsum.photos/200'}
        style={{ aspectRatio: '1/1' }}
      />
    </div>
  )
}
