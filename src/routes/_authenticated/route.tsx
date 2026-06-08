import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { checkAuthStatus } from '@/services/auth.service'
import { authenticatedAppinitialization } from '@/services/app.initializer.service';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    const authenticated = checkAuthStatus();

    // 🔥 if not logged in → go to login
    if (!authenticated) {
      throw redirect({
        to: '/sign-in',
      })
    } else {
      authenticatedAppinitialization();
    }
  },
  component: AuthenticatedLayout,
})
