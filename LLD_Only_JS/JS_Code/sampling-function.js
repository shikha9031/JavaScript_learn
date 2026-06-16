
/** Sampler Function */
function message(){
    console.log("hello");
}

function sampler(func, count, context){
    let counter = 0;
    return function(...args){
        counter++;
        context = this ?? context;
        if(counter === count){
            func.call(context, ...args);
            counter = 0;
        }
    }
}
const sample = sampler(message, 4);
sample();
sample();
sample();

/** Toggle Function */

function toggle(...args){
    let arr = [...args];
    let current = -1;
   
    return function(){
        current = (current+1)%arr.length
        return arr[current];
    }
}

let onOff = toggle("on", "off", 'switch');
console.log(onOff());
console.log(onOff());
console.log(onOff());

// Flatten An Array
function getFlattenArrRecursion(arr, result){
    for(let i = 0; i<arr.length; i++){
        if(Array.isArray(arr[i])){
            getFlattenArrRecursion(arr[i], result);
        }
        else{
            result.push(arr[i]);
        }
    }
    return result;
}

let flattenArr = [];
let arr = [[[1, [1.1]], 2, 3], [4, 5]]; 
console.log(getFlattenArrRecursion(arr, flattenArr));

// pipping-1

function pipe(obj){
    return function(...args){
        let arr = [...args];

     function recursion(obj){
         let newObj = {};
        for(let [key, value] of Object.entries(obj)){
            if(isObject(value)){
               newObj[key] = recursion(value);
            }
            else if(typeof value === 'function'){
                newObj[key] = value.call(this, ...args);
            }
         }
         return newObj;
        }
        return recursion(obj);
    }
}

function isObject(obj){
    return obj !== null && typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype;
}

let obj = {
  a : {
    b : (a,b,c) => a+b+c,
    c : (a,b,c) => a+b-c,
  },
  d : (a,b,c) => a-b-c
}
const output = pipe(obj)(1,1,1);
console.log(output);