import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/authenticated-test')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/test"! john testing authenticated test</div>
}
