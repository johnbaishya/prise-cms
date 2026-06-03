import AddProduct from '@/features/showcase/product/pages/add-product'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/showcase/product/add',
)({
  component: AddProduct,
})


