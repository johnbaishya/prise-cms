
import { CreateProductDTO, ListProductsQueryDTO, UpdateProductDTO } from "@/Types/request/showcase-request";
import { apiClient } from "../apiClient";
import ENDPOINTS from "../endpoints";






export function getProductList(query:ListProductsQueryDTO,companyId:string) {
  const filteredQuery = Object.fromEntries(
    Object.entries(query).filter(
      ([_, value]) => value !== undefined
    )
  );
  let queryParams:string = new URLSearchParams(filteredQuery as any).toString();
  return apiClient.get(ENDPOINTS.showcase.listProductByCompanyId(companyId, queryParams)).then(res => res.data)
}









export function updateProduct(param:{data:UpdateProductDTO,productId:string}){
    const data = param.data;
    // const {name,slug,description,image} = data;
    // let fd = new FormData();
    // if(name){
    //     fd.append("name",name);
    // }
    // if(slug){
    //     fd.append("slug",slug)
    // }
    // if(description){
    //     fd.append("description",description)
    // }
    // if(image instanceof(File)){
    //     fd.append("image",image)
    // }


  return apiClient.put(ENDPOINTS.showcase.updateProduct(param.productId),data);
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