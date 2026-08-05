function sum(a,b,c,d){
    return a+b+c+d;
}

function curry(fn){
    function curried(...args){
        if(fn.length <= args.length){
           const result = fn.apply(this, args);
           return result;
        }
        else{
            return function(...nextArgs){// this is function composition
               return curried.apply(this, [...args, ...nextArgs]);
            }
        }
    }
    return curried;
}

let curriedSum = curry(sum);
console.log(curriedSum(1,2,3,4,5)); // 10
console.log(curriedSum(1)(2,3)(4,5)); // 10
console.log(curriedSum(1)(2)(3)(4)); // 10

//curry implementation second approach

let curry = (fn) => {
  
  // helper function
  let helper = (...args) => {
    
    // if we are receiving the expected number of arguments
    if(args.length >= fn.length){
      // pass it to callback fn
      return fn(...args);
    }else{
      // return a new function that will accept the remaining arguments
      let temp = (...args2) => {
        
        // recursively call the same function
        // to validate if we have received the required amount
        // of arguments
        return helper(...args, ...args2);
      };
      
      // return the function
      return temp;
    }
  };
  
  // return helper
  return helper;
}
