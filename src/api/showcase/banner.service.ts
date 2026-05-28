import { apiClient } from "../apiClient"
import ENDPOINTS from "../endpoints"



export const getShowcaseBannerImages = (param:{companyId:string|null|undefined})=>{
     if(!param.companyId){
    return Promise.resolve([]);
  }
    return apiClient.get(ENDPOINTS.showcase.getbannerImages(param.companyId)).then(res=>res.data)
}




export const addShowcaseBannerImages = (param:{companyId:string, images:File[]})=>{
    const fd = new FormData();
    param.images.forEach((image) => {
        fd.append("images", image);
    });

    return apiClient.post(ENDPOINTS.showcase.addbannerImages(param.companyId),fd);

}