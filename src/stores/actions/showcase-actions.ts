import   { type DialogType, type ShowcaseStateData, useShowcaseStore } from "../showcase-store";
import type { IProduct, IProductCategory, IProductTag } from "@/Types/entities/showcase-entities";

// function to update the showcase store
export const updateShowcaseState = (data:Partial<ShowcaseStateData>)=>{
    useShowcaseStore.getState().updateState(data);
}

export const openShowcaseDialog = (dialog:DialogType)=>{
    updateShowcaseState({
        productCategoryDialog:dialog
    })
}


export const openProductTagDialog = (dialog:DialogType)=>{
    updateShowcaseState({
        productTagDialog:dialog,
    })
}


export const closeShowcaseDialog = ()=>{
    openShowcaseDialog(null);
}


// function to reset the showcase store to initial state
export const resetShowcaseState = ()=>{
    useShowcaseStore.getState().reset();
}



export const setSelectedProductCategoryRow= (row:IProductCategory|null)=>{
    updateShowcaseState({
        selectedCategoryRow:row,
    })
}


export const setSelectedProductTagRow= (row:IProductTag|null)=>{
    updateShowcaseState({
        selectedProductTagRow:row,
    })
}



export const setSelectedProductRow= (row:IProduct|null)=>{
    updateShowcaseState({
        selectedProductRow:row,
    })
}



export const resetCategoryDialogs = ()=>{
    updateShowcaseState({
        productCategoryDialog:null,
        selectedCategoryRow:null
    })
}


export const resetProductTagDialogs = ()=>{
    updateShowcaseState({
        productTagDialog:null,
        selectedProductTagRow:null
    })
}


export const resetProductDialogs = ()=>{
    updateShowcaseState({
        productDialog:null,
        selectedProductRow:null,
    })
}