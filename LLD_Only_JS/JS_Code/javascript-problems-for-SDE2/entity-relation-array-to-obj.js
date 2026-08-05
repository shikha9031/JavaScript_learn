
function ancestry(arr){
    let obj = {};
    for(let [child, parent] of arr){
        obj[child] = parent;
    }
   return convert(obj);
}

const convert = (obj)=>{
    let ans = [];
    for(let [key, va] of Object.entries(obj)){
        ans.push(getKey(obj, key));
    }
   return ans;
}

// helper function to form the string
// till the last hierarchy
const getKey = (obj, key) => {
  // access the
  const val = obj[key];
  
  // the formation can be reversed by chaning the order of the keys
  // child -> parent | parent -> child
  if(val in obj){
    return getKey(obj, val) + " -> " + key;
  }else{
    return val + " -> " + key;
  }
}

//Input:
const arr = [
  ["lion", "cat"],
  ["cat", "mammal"],
  ["dog", "mammal"],
  ["mammal", "animal"],
  ["fish", "animal"],
  ["shark", "fish"],
];

console.log(ancestry(arr));

//Output:
[
  "animal -> mammal -> cat -> lion",
  "animal -> mammal -> cat",
  "animal -> mammal -> dog",
  "animal -> mammal",
  "animal -> fish",
  "animal -> fish -> shark"
]
