import { getRouteApi } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
// import { UsersProvider } from './components/users-provider'
import { useQuery } from '@tanstack/react-query'
import { QueryKey } from '@/Types/appEnums'
import { CompanyCard } from './components/company-card'
import { Button } from '@/components/ui/button'
import { getUserCompanies } from '@/api/core/company.service'
// import { users } from './data/users'

const route = getRouteApi("/_authenticated/company/");

export function Company() {
    // const search = route.useSearch()
    const navigate = route.useNavigate();

    const { data: CompaniesData } = useQuery({
        queryKey: [QueryKey.LIST_COMPANIES],
        queryFn: getUserCompanies
    })


    return (
        <>
            <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
                <div className='flex flex-wrap items-end justify-between gap-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Companies</h2>
                        <p className='text-muted-foreground'>
                            Manage your Companies and their details here.
                        </p>
                    </div>
                    <Button
                        onClick={() => {
                            navigate({
                                to: "/company/add"
                            })
                        }}
                    >
                        Add New Company +
                    </Button>

                </div>
                <div className='grid grid-cols-2 md:grid-cols-3, lg:grid-cols-4 gap-2'>
                    {
                        CompaniesData?.data.map(item => {
                            return (
                                <CompanyCard key={item._id} data={item} />

                            )
                        })
                    }
                </div>

            </Main>


        </>
    )
}