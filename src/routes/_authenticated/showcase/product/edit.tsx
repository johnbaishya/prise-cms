import EditProduct from '@/features/showcase/product/edit-product'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/showcase/product/edit')({
  component: EditProduct,
})
