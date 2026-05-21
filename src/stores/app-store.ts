import { create } from 'zustand'


export interface AppStateData {
    selectedCompany:{_id:string,name:string}|null,
    loader:boolean,
}

export interface AppState extends AppStateData{
    updateState:(data:Partial<AppStateData>)=>void,
    reset:()=>void,
}

const initialState:AppStateData = {
    selectedCompany:{
        _id:"69fb3cb85167b287be9fdf51",
        name:"snaptap"
    },
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


