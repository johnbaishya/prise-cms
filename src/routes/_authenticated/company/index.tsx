import { Company } from '@/features/company'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/company/')({
  component: Company,
})
