import type { ICompany } from '@/Types/entities/core-entities'
import { create } from 'zustand'


export interface AppStateData {
    selectedCompany:ICompany|null,
    loader:boolean,
}

export interface AppState extends AppStateData{
    updateState:(data:Partial<AppStateData>)=>void,
    reset:()=>void,
}

const initialState:AppStateData = {
    selectedCompany:null,
    loader:false,
}



export const useAppStore = create<AppState>()((set)=>{
    return {
        ...initialState,
        updateState:(data)=>set((state)=>({
            ...state,
            ...data
        })),
        reset:()=>set(initialState)
    }
})


