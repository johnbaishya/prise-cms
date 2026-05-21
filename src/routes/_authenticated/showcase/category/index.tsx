import { Category } from '@/features/showcase/category'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/showcase/category/')({
  component: Category,
})


