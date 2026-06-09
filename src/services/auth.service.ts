import { useAuthStore } from "@/stores/auth-store";
import { LocalStorageKey } from "@/Types/appEnums";
import { type IUser } from "@/Types/entities/core-entities";




export const authenticateApp = (user:IUser,token:string)=>{
    // store the token in local storage
    const stringUser = JSON.stringify(user);
    localStorage.setItem(LocalStorageKey.USER,stringUser);
    localStorage.setItem(LocalStorageKey.TOKEN, token);
    hydrateAuthState(user,token);
}




export const hydrateAuthState = (user:IUser,token:string)=>{
    useAuthStore.getState().auth.setUser(user);
    useAuthStore.getState().auth.setAccessToken(token)
}




export const checkAuthStatus = ():boolean=>{
    // to check if the user is authenticated by checking if the token is exist in the local storage
    const token = localStorage.getItem(LocalStorageKey.TOKEN);
    if(!token){
        logoutApp();
        return false;
    }
    const user = localStorage.getItem(LocalStorageKey.USER);
    if(!user){
        logoutApp();
        return false;
    }

    const parsedUser = JSON.parse(user) as IUser;
    hydrateAuthState(parsedUser,token);
    return true;
}





export const logoutApp = ()=>{
    // remove the token from local storage
    localStorage.removeItem(LocalStorageKey.TOKEN);
    localStorage.removeItem(LocalStorageKey.USER);
    localStorage.removeItem(LocalStorageKey.COMPANY);

    useAuthStore.getState().auth.reset();
}


export const isAuthenticated = ():boolean =>{
    // to check if the user is authenticated by checking if the token is exist in the local storage
    return !!localStorage.getItem(LocalStorageKey.TOKEN);
}


export const getToken = ():string | null=>{
    // to get the token from the local strorage
    return localStorage.getItem('token');
}