import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/showcase/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      thisa is sdf
    </>
  )
}
