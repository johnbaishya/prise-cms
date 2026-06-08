import * as React from 'react'
import { Building, ChevronsUpDown, Plus } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useQuery } from '@tanstack/react-query'
import { QueryKey } from '@/Types/appEnums'
import { getUserCompanies } from '@/api/core/company.service'
import { ImageThumbnail } from '../ui/image-thumbnail'
import { useAppStore } from '@/stores/app-store'
import { getRouteApi } from '@tanstack/react-router'
import { selectCompany } from '@/features/company/company.service'

const route = getRouteApi("/_authenticated/company/");


export function CompanySwitcher
  () {
  const { isMobile } = useSidebar()
  const { selectedCompany } = useAppStore(state => state)

  const navigate = route.useNavigate();
  const { data: CompaniesData, loading: CompaniesLoading } = useQuery({
    queryKey: [QueryKey.LIST_COMPANIES],
    queryFn: getUserCompanies
  })

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              {
                !!selectedCompany ?

                  <>
                    <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                      {
                        selectedCompany?.brand_logo ?
                          <ImageThumbnail src={selectedCompany.brand_logo} />
                          :
                          <Building />
                      }
                    </div>
                    <div className='grid flex-1 text-start text-sm leading-tight'>
                      <span className='truncate font-semibold'>
                        {selectedCompany?.name}
                      </span>
                      <span className='truncate text-xs'>{selectedCompany?.category}</span>
                    </div>
                  </>
                  :
                  <span className='truncate font-semibold'>
                    Select Company
                  </span>
              }
              <ChevronsUpDown className='ms-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-xs text-muted-foreground'>
              Companies
            </DropdownMenuLabel>
            {
              CompaniesLoading ?
                <div>loading...</div>
                :
                CompaniesData?.data.map((company, index) => {
                  return (
                    <DropdownMenuItem
                      key={company._id}
                      onClick={() => {
                        selectCompany(company);
                      }}
                      className='gap-2 p-2'
                    >
                      <div className='flex size-6 items-center justify-center rounded-sm border'>
                        {
                          company.brand_logo ?
                            <ImageThumbnail src={company.brand_logo} />
                            :
                            <Building />
                        }
                      </div>
                      {company.name}
                      <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  )
                })
            }
            {/* {teams.map((team, index) => (
              
            ))} */}
            <DropdownMenuSeparator />
            <DropdownMenuItem className='gap-2 p-2'
              onClick={() => {
                navigate({
                  to: "/company/add"
                })
              }}
            >
              <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                <Plus className='size-4' />
              </div>
              <div className='font-medium text-muted-foreground'>Add new Company</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
} 
