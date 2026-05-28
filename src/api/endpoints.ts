const ENDPOINTS = {
  USER_LOGIN: '/user/login',
  USER_REGISTER: '/user/register',
  showcase: {
    listProductCategoryByCompanyId: (
      companyId: string,
      queryParams: string
    ): string => {
      const uri: string = `/showcase/company/${companyId}/product-category?${queryParams}`
      return uri
    },
    listAllProductCategoryByCompanyId: (companyId: string): string => {
      const uri: string = `/showcase/company/${companyId}/product-category?limit=1000`
      return uri
    },
    updateProductCategory: (categoryId: string): string =>
      `/showcase/product-category/${categoryId}`,
    createProductCategory: '/showcase/product-category',
    deleteProductCategory: (categoryId: string): string =>
      `/showcase/product-category/${categoryId}`,

    // ===========================================================================================================================

    listProductTagByCompanyId: (
      companyId: string,
      queryParams: string
    ): string => {
      const uri: string = `/showcase/company/${companyId}/product-tag?${queryParams}`
      return uri
    },
    listAllProductTagByCompanyId: (companyId: string): string => {
      const uri: string = `/showcase/company/${companyId}/product-tag?limit=1000`
      return uri
    },
    updateProductTag: (tagId: string): string =>
      `/showcase/product-tag/${tagId}`,
    createProductTag: '/showcase/product-tag',
    deleteProductTag: (tagId: string): string =>
      `/showcase/product-tag/${tagId}`,

    listProductByCompanyId: (
      companyId: string,
      queryParams: string
    ): string => {
      const uri: string = `/showcase/company/${companyId}/products?${queryParams}`
      return uri
    },
    updateProduct: (productId: string): string =>`/showcase/product/${productId}`,
    createProduct: '/showcase/product',
    deleteProduct: (productId: string): string => `/showcase/product/${productId}`,
    listProductGallery:(productId:string)=>`/showcase/product/${productId}/gallery`,
    addProductGallery:(productId:string)=>`/showcase/product/${productId}/gallery`,
    addbannerImages:(companyId:string)=>`/showcase/company/${companyId}/banner`,
    getbannerImages:(companyId:string)=>`/showcase/company/${companyId}/banner`,
  },
  core:{
    deleteGalleryimage:(galleryId:string)=>`/gallery/${galleryId}`
  }
}

export default ENDPOINTS
