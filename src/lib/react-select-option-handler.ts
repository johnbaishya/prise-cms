type SelectOption = {
  label:string,
  value:string,
}

type SourceData = {
  _id: string;
  name: string;
  [key: string]: unknown;
};

export const mapDataToSelectOption = (list:SourceData[]):SelectOption[]=>{
    return list.map(item=>({
        label:item.name,
        value:item._id
    }));
}


export const filterOptions = (inputValue: string,list:SourceData[]):SelectOption[] => {
    // const mdata:SelectOption[] = list.map(item=>({
    //     label:item.name,
    //     value:item._id
    // }));

    const mdata:SelectOption[] = mapDataToSelectOption(list);

    return (
      mdata?.filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      ) || []
    );
  };



//  export const loadOptions = (
//     inputValue: string,
//     callback: (options: SelectOption[]) => void
//   ) => {
//       callback(filterOptions(inputValue));
//   };



export const getReactSelectLoadOptions = (list:SourceData[])=>{
    return (
    inputValue: string,
    callback: (options: SelectOption[]) => void
  ) => {
      callback(filterOptions(inputValue,list));
  };
}