import { AppStateData, useAppStore } from "../app-store";

export const updateAppState = (data:Partial<AppStateData>)=>{
    useAppStore.getState().updateState(data);
}


export const getSelectedCompanyId = ():string=>{
    const companyId:string = useAppStore.getState().selectedCompany?._id||"";
    return companyId;
}


export const showAppLoader = (status:boolean)=>{
    useAppStore.getState().updateState({
        loader:status
    })
}