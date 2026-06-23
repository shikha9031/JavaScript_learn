function add(...args){
    //store current argument;
    debugger;
    let sum = args;
    function resultFn(...args2){
        //merge two new arguments
        sum = [...sum, ...args2];
        return resultFn;
    }
    // override the valueOf function to return sum
    resultFn.valueOf= function(){
        return sum.reduce((acc,num)=> acc + num, 0);
    }

    //extend the valueOf
    resultFn.value = resultFn.valueOf;
    //return inner function
    // on any primitive action .valueOf will be invoked and it will return the value
    return resultFn;
}

console.log(add(1)(2).value() == 3); 
console.log(add(1, 2)(3).value() == 6); 
console.log(add(1)(2)(3).value() == 6); 
console.log(add(1)(2) + 3);