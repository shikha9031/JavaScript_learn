function filterObject(arr, filterKey){
    if(typeof filterKey === 'number' && arr[filterKey]){
        return arr[filterKey];
    }
    for(let i = 0; i<arr.length; i++){
        for(let [key, value] of Object.entries(arr[i])){
            if(value === filterKey){
                return arr[i];
            }
        }
    } 
    return undefined;
}
const arr = [
  { name: "Amir", id: "1" },
  { name: "Samlan", id: "2" },
  { name: "Shahrukh", id: "0" },
];

console.log(filterObject(arr, 0)); // { name: "Amir", id: "1" }
console.log(filterObject(arr, "Amir")); // { name: "Amir", id: "1" }
console.log(filterObject(arr, "0")); // { name: "Shahrukh", id: "0" }