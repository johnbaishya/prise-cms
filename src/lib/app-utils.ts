import { LocalStorageKey } from "@/Types/appEnums";


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


export const storeObjectToLocalStorage = (key:LocalStorageKey,val:object)=>{
  const stringVal = JSON.stringify(val);
  localStorage.setItem(key,stringVal);
}



export const getObjectItemFromLocalStorage = (KeyName:LocalStorageKey):object=>{
  const data =  localStorage.getItem(KeyName);
  if(data){
    return JSON.parse(data);
  }
  return {};
}