
Array.prototype.myMap = function(cb, thisArgs){
    if(typeof cb !== 'function'){
        return new TypeError(cb + " is not a function.");
    }
    let arr = this;
    let result = new Array(arr.length);
    
    for(let i = 0; i<arr.length; i++){
        if(arr[i]){
             result[i] = cb.call(thisArgs, arr[i], i, arr);
        }
    }
    return result;
}

const arr = [1, 2, 3];
const multipliedArr = arr.myMap((e) => e * 2);
console.log(multipliedArr);