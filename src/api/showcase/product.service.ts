
import type { CreateProductDTO, ListProductsQueryDTO, UpdateProductDTO } from "@/Types/request/showcase-request";
import { apiClient } from "../apiClient";
import ENDPOINTS from "../endpoints";
import { IGallery } from "@/Types/entities/core-entities";






export function getProductList(query:ListProductsQueryDTO,companyId:string) {
  const filteredQuery = Object.fromEntries(
    Object.entries(query).filter(
      ([_, value]) => value !== undefined
    )
  );
  const queryParams:string = new URLSearchParams(filteredQuery as any).toString();
  return apiClient.get(ENDPOINTS.showcase.listProductByCompanyId(companyId, queryParams)).then(res => res.data)
}









export function updateProduct(param:{data:UpdateProductDTO,productId:string|undefined}){
  const {data,productId} = param;
  if(!productId)
    return
  return apiClient.put(ENDPOINTS.showcase.updateProduct(productId),data);
}











export function createProduct(param:{data:CreateProductDTO}){
  const data = param.data;
  const {name,slug,description,companyId,productCategoryId,tags,price,originalPrice,stock,images} = data;
  const fd = new FormData();
  fd.append("name",name);
  fd.append("slug",slug);
  fd.append("companyId",companyId);
  fd.append("productCategoryId",productCategoryId);
  fd.append("price",String(price));

  if(!!description){
    fd.append("description",description);
  }

  if(!!originalPrice){
    fd.append("originalPrice",String(originalPrice));
  }

  if(!!stock){
    fd.append("stock",String(stock))
  }

  if(!!tags){
    tags.forEach((tag) => {
        fd.append("tags", tag)
    })
  }

  if(!!images){
    images.forEach((image)=>{
        if(image instanceof File){
            fd.append("images",image)
        }
    })
  }
  
  return apiClient.post(ENDPOINTS.showcase.createProduct,fd);
}










export function deleteProduct(param:{id:string}){
  return apiClient.delete(ENDPOINTS.showcase.deleteProduct(param.id));
}




export const getProductGallery = (param:{id:string|null|undefined}):Promise<IGallery[]>=>{
  if(!param.id){
    return Promise.resolve([]);
  }
   const data =  apiClient.get(ENDPOINTS.showcase.listProductGallery(param.id)).then(res=>res.data);
   return data;
}



export const addProductGallery = (param:{id:string,images:File[]})=>{

  // if(!!images){
  //   images.forEach((image)=>{
  //       if(image instanceof File){
  //           fd.append("images",image)
  //       }
  //   })
  // }
  const fd = new FormData();
  param.images.forEach((image) => {
    fd.append("images", image);
  });


  return apiClient.post(ENDPOINTS.showcase.addProductGallery(param.id),fd);
}