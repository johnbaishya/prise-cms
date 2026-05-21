import { Category } from '@/features/showcase/category'
import { Tag } from '@/features/showcase/tag'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/showcase/tag/')({
  component: Tag,
})


