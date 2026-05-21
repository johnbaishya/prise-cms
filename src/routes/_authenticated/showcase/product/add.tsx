import AddProduct from '@/features/showcase/product/add-product'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/showcase/product/add',
)({
  component: AddProduct,
})


