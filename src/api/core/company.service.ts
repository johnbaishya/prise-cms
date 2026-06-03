import type { ListResponse } from "@/Types/response/list-response";
import { apiClient } from "../apiClient"
import ENDPOINTS from "../endpoints"
import type { ICompany } from "@/Types/entities/core-entities";
import type { AddCompanyFormDTO } from "@/features/company/company.types";
import { createFormData } from "@/lib/app-utils";


export const getUserCompanies = ():Promise<ListResponse<ICompany>>=>{
    return apiClient.get(ENDPOINTS.core.listCompanies).then(res=>res.data);
}


export const createCompany = (param:{data:AddCompanyFormDTO}):Promise<ICompany>=>{
    const data = param.data;
    const fd = createFormData(data);

    return apiClient.post(ENDPOINTS.core.createCompany, fd);
}