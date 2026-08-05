function filterObject(obj, fn){
    let result = {};

    for(let [key, value] of Object.entries(obj)){
        if(isObject(value)){
             const filtered = filterObject(value, fn);
            if (Object.keys(filtered).length > 0) {
                result[key] = filtered;
            }
        }
        else{
            let val = fn.call(this, value);
            if(val){
                result[key] = value;
            }
        }
    }
    return result;
}

function isObject(value){
    return (typeof value === 'object') && (value !== null) && Object.prototype === Object.getPrototypeOf(value)
}
const obj = {
  a: 1,
  b: {
    c: "Hello World",
    d: 2,
    e: {
     f: {
       g: -4,
      },
    },
    h: "Good Night Moon",
  },
};

const filter = (s) => typeof s === "string";

console.log(filterObject(obj, filter));

// Output:
// {
//   b: {
//     c: "Hello World",
//     h: "Good Night Moon",
//   }
// };