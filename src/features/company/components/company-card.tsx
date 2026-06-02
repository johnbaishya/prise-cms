import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageThumbnail } from "@/components/ui/image-thumbnail"
import { updateAppState } from "@/stores/actions/app-actions"
import { ICompany } from "@/Types/entities/core-entities"
import { Building } from "lucide-react"

type PropType = {
    data: ICompany
}

export const CompanyCard = (props: PropType) => {
    const { data } = props;
    return (
        <Card onClick={() => {
            updateAppState({
                selectedCompany: data
            })
        }} className="hover:shadow-accent-foreground">
            <CardContent>
                {
                    data.brand_logo ?
                        <ImageThumbnail className="" src={data.brand_logo} />
                        :
                        <Building className="size-32" />
                }
                <CardTitle className="text-xl">
                    {data.name}
                </CardTitle>
                <p className="text-sm">{data.category}</p>
                <p className="text-sm font-extralight">{data.description}</p>
                {/* <div className="grid gap-2 grid-cols-2">
                    <Button>
                        select
                    </Button>
                    <Button>
                        View
                    </Button>

                </div> */}
                <CardFooter>
                </CardFooter>
            </CardContent>
        </Card>
    )
}