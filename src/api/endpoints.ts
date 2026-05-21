
const ENDPOINTS = {
    USER_LOGIN: '/user/login',
    USER_REGISTER: '/user/register',
    showcase:{
        listProductCategoryByCompanyId:(
            companyId:String,
            queryParams:string
        ):string=>{
            let uri:string = `/showcase/company/${companyId}/product-category?${queryParams}`;
            return uri;
        },
        updateProductCategory:(categoryId:string):string=> (`/showcase/product-category/${categoryId}`),
        createProductCategory:'/showcase/product-category',
        deleteProductCategory:(categoryId:string):string=>(`/showcase/product-category/${categoryId}`), 



        listProductTagByCompanyId:(
            companyId:String,
            queryParams:string
        ):string=>{
            let uri:string = `/showcase/company/${companyId}/product-tag?${queryParams}`;
            return uri;
        },
        updateProductTag:(tagId:string):string=> (`/showcase/product-tag/${tagId}`),
        createProductTag:'/showcase/product-tag',
        deleteProductTag:(tagId:string):string=>(`/showcase/product-tag/${tagId}`), 



        listProductByCompanyId:(
            companyId:String,
            queryParams:string
        ):string=>{
            let uri:string = `/showcase/company/${companyId}/products?${queryParams}`;
            return uri;
        },
        updateProduct:(productId:string):string=> (`/showcase/product/${productId}`),
        createProduct:'/showcase/product',
        deleteProduct:(productId:string):string=>(`/showcase/product/${productId}`), 
        
    }

} 

export default ENDPOINTS