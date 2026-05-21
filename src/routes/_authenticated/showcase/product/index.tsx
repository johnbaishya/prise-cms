import { Product } from '@/features/showcase/product'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/showcase/product/')({
  component: Product,
})
