import { Banner } from '@/features/showcase/banner'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/showcase/banner/')({
    component: Banner,
})
