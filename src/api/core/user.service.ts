import { type IUser } from "@/Types/entities/core-entities";
import { apiClient } from "../apiClient";
import ENDPOINTS from "../endpoints";


export const updateUserProfilePic = (param:{image:File}):Promise<IUser>=>{
    const fd = new FormData();
    fd.append("profile_pic",param.image);
    return apiClient.post(ENDPOINTS.core.updateUserProfilePic,fd).then(res=>res.data);
}

export const getUserProfile = ():Promise<IUser>=>{
    return apiClient.get(ENDPOINTS.core.getUserProfile).then(res=>res.data);
}