import type { IProduct, IProductCategory, IProductTag, IProductWithGallery } from "@/Types/entities/showcase-entities"
import { create } from "zustand"


export type DialogType = 'add' | 'edit' | 'view' | 'delete' | null
type SetDialogType =  (dialog: DialogType) => void

export interface ShowcaseStateData {
        productCategoryDialog:DialogType,
        productTagDialog:DialogType,
        productDialog:DialogType,
        selectedCategoryRow:IProductCategory|null,
        selectedProductTagRow:IProductTag|null
        selectedProductRow:IProductWithGallery|null,
}

export interface ShowcaseState extends ShowcaseStateData{
    updateState:(data:Partial<ShowcaseStateData>)=>void,
    reset:()=>void,
}


const initialState:ShowcaseStateData = {
    productCategoryDialog:null,
    productTagDialog:null,
    productDialog:null,
    selectedCategoryRow:null,
    selectedProductTagRow:null,
    selectedProductRow:null,
}

export const useShowcaseStore = create<ShowcaseState>()((set)=>{
    return{
      ...initialState,
      updateState:(data)=>set((state)=>({
        ...state,
        ...data,
      })),
      reset:()=>set(initialState)
    }

})