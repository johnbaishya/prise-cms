

export const createFormData = (dataObject:Record<string, string|Blob>) =>{
  const formData = new FormData();
  
  Object.keys(dataObject).forEach(key => {
    const value:string|Blob = dataObject[key];
    
    // Completely skips undefined or null values
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  
  return formData;
}