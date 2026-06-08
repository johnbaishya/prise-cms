import { updateAppState } from "@/stores/actions/app-actions";
import { LocalStorageKey, QueryKey } from "@/Types/appEnums"
import type { ICompany } from "@/Types/entities/core-entities";
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const selectCompany = (company:ICompany)=>{
    const stringCompany = JSON.stringify(company);
    localStorage.setItem(LocalStorageKey.COMPANY,stringCompany);
    updateAppState({
        selectedCompany:company,
    });

    queryClient.invalidateQueries({
        queryKey:[
            QueryKey.LIST_PRODUCT,
            QueryKey.LIST_PRODUCT_CATEGORY,
            QueryKey.LIST_PRODUCT_CATEGORY_ALL,
            QueryKey.LIST_PRODUCT_TAG,
            QueryKey.LIST_PRODUCT_TAG_ALL,
            QueryKey.LIST_SHOWCASE_BANNER_IMAGES
        ]
    })
}