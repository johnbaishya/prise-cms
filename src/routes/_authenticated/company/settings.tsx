import CompanySettings from '@/features/company/pages/company-settings'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/company/settings')({
  component: CompanySettings,
})