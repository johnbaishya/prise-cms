import ViewProduct from '@/features/showcase/product/view-product'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/showcase/product/view')({
  component: ViewProduct,
})
