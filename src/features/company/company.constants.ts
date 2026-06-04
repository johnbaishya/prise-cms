import type { AddCompanyFormDTO } from "./company.types";


export const emptyAddCompanyFormValues = ():Partial<AddCompanyFormDTO>=>({
  name: '',
  description: '',
  category:"",
  email: '',
  phone: '',
  address: '',
  lat:"",
  lon:"",
  currency:"",
  brand_color:"",
  brand_logo:undefined,
})