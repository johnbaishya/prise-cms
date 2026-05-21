import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { TagPrimaryButtons } from './components/tag-primary-buttons'
// import { UsersProvider } from './components/users-provider'
import { useQuery } from '@tanstack/react-query'
import { QueryKey } from '@/Types/appEnums'
import { getProductCategoryList } from '@/api/showcase/product-category.service'
import { ProductTagTable } from './components/product-tag-table'
import { ProductTagDialogs } from './components/product-tag-dialogs'
// import { users } from './data/users'

const route = getRouteApi('/_authenticated/showcase/tag/')

export function Tag() {
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
            <h2 className='text-2xl font-bold tracking-tight'>Tag List</h2>
            <p className='text-muted-foreground'>
              Manage your Tags and their details here.
            </p>
          </div>
          <TagPrimaryButtons/>
        </div>
        <ProductTagTable navigate={navigate} />
      </Main>

      <ProductTagDialogs />
    </>
  )
}