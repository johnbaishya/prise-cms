import { updateAppState } from "@/stores/actions/app-actions";
import { LocalStorageKey } from "@/Types/appEnums"
import type{ ICompany } from "@/Types/entities/core-entities";

export const hydrateSelectedCompany = ()=>{
    const selectedCompanyString = localStorage.getItem(LocalStorageKey.COMPANY);
    if(selectedCompanyString){
        const sc = JSON.parse(selectedCompanyString) as ICompany;
        updateAppState({
            selectedCompany:sc 
        })
        
    }
}

export const authenticatedAppinitialization = ()=>{
    hydrateSelectedCompany();
}