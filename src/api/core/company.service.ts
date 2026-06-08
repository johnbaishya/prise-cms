import type { ListResponse } from "@/Types/response/list-response";
import { apiClient } from "../apiClient"
import ENDPOINTS from "../endpoints"
import type { ICompany } from "@/Types/entities/core-entities";
import type { AddCompanyFormDTO, EditCompanyFormDTO } from "@/features/company/company.types";
import { createFormData } from "@/lib/app-utils";


export const getUserCompanies = ():Promise<ListResponse<ICompany>>=>{
    return apiClient.get(ENDPOINTS.core.listCompanies).then(res=>res.data);
}


export const createCompany = (param:{data:AddCompanyFormDTO}):Promise<ICompany>=>{
    const data = param.data;
    const fd = createFormData(data);

    return apiClient.post(ENDPOINTS.core.createCompany, fd);
}


export const updateCompany = (param:{companyId:string,data:EditCompanyFormDTO}):Promise<ICompany>=>{
    const data = param.data;
    return apiClient.put(ENDPOINTS.core.updateCompany(param.companyId),data).then(res=>res.data);
}


export const updateCompanyBrandLogo = (param:{companyId:string,image:File})=>{
    const fd = new FormData();
    fd.append("brand_logo",param.image);
    return apiClient.post(ENDPOINTS.core.updateCompanyBrandLogo(param.companyId),fd);
}


export const getCompanyDetail = (param:{companyId:string}):Promise<ICompany>=>{
    return apiClient.get(ENDPOINTS.core.getCompanyDetaail(param.companyId)).then(res=>res.data)
}