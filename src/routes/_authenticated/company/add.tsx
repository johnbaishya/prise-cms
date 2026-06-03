import AddCompany from '@/features/company/pages/add-company'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/company/add')({
  component: AddCompany,
})
