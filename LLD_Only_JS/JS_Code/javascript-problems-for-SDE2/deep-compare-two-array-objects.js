function compare(item1, item2){
    if(Array.isArray(item1) && Array.isArray(item2)){
            return compareArray(item1, item2);
    }
    else if(isObject(item1) && isObject(item2)){
            return compareObject(item1, item2);
    }
    else if(isFunction(item1) && isFunction(item2)){
        return item1.toString() === item2.toString();
    }
    return Object.is(item1, item2);;
}
function isObject(item){
    return item !== null && typeof item === 'object';
}
function isFunction(item){
    return typeof item === 'function';
}

function compareArray(item1, item2){
    if(item1.length !== item2.length){
        return false;
    }
    for(let i = 0; i<item1.length; i++){
        if(!compare(item1[i], item2[i])){
            return false;
        }
    }
    return true;
}
function compareObject(item1, item2){
    if(Object.keys(item1).length !== Object.keys(item2).length){
        return false;
    }
    for(let key of Object.keys(item1)){
        if(!Object.hasOwn(item2, key)){
            return false;
        }
        if(!compare(item1[key], item2[key])){
            return false;
        }
    }
    return true;
}

// Normal array
let arr1 = [1, 2, 3, 4, 5];
let arr2 = [1, 3, 2, 4, 5];
console.log(compare(arr1, arr2));  // returns false

// Nested array with objects
let arrObj1 = [1, 2, {
	a: 1,
	b: 2,
	c: 3,
  d: function(){
    console.log("abcd");
  }
}, 4, 5];

let arrObj2 = [1, 2, {
	c: 3,
	b: 2,
	a: 1,
  d: function(){
    console.log("abcd");
  }
}, 4, 5];

console.log(compare(arrObj1, arrObj2));  // returns true

// Nested array
let arr4 = [[1, 2], [3, 4, 5]];
let arr3 = [[1, 2], [3, 4, 5]];
console.log(compare(arr4, arr3));  // returns true