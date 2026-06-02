import type { ListResponse } from "@/Types/response/list-response";
import { apiClient } from "../apiClient"
import ENDPOINTS from "../endpoints"
import type { ICompany } from "@/Types/entities/core-entities";


export const getUserCompanies = ():Promise<ListResponse<ICompany>>=>{
    return apiClient.get(ENDPOINTS.core.listCompanies).then(res=>res.data);
}