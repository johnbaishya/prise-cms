import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ProductDialogs } from './components/product-dialogs'
import { ProductPrimaryButtons } from './components/product-primary-buttons'
import { ProductTable } from './components/product-table'



const route = getRouteApi('/_authenticated/showcase/product/')

export function Product() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  

  return (
    <>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Product List</h2>
            <p className='text-muted-foreground'>
              Manage your Product and their details here.
            </p>
          </div>
          <ProductPrimaryButtons/>
        </div>
        <ProductTable navigate={navigate} />
      </Main>

      <ProductDialogs />
    </>
  )
}