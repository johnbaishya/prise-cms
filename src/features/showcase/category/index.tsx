import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ProductCategoryDialogs } from './components/product-category-dialogs'
import { CategoryPrimaryButtons } from './components/category-primary-buttons'
// import { UsersProvider } from './components/users-provider'
import { CategoryTable } from './components/category-table'
import { useQuery } from '@tanstack/react-query'
import { QueryKey } from '@/Types/appEnums'
import { getProductCategoryList } from '@/api/showcase/product-category.service'
// import { users } from './data/users'

const route = getRouteApi('/_authenticated/showcase/category/')

export function Category() {
  const search = route.useSearch()
  const navigate = route.useNavigate()



  return (
    <>
      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Category List</h2>
            <p className='text-muted-foreground'>
              Manage your Categories and their details here.
            </p>
          </div>
          <CategoryPrimaryButtons />
        </div>
        <CategoryTable navigate={navigate} />
      </Main>

      <ProductCategoryDialogs />
    </>
  )
}