
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

const groupBy = (values, keyFinder) => {
  // using reduce to aggregate values
  return values.reduce((a, b) => {
    // depending upon the type of keyFinder
    // if it is function, pass the value to it
    // if it is a property, access the property
    const key = typeof keyFinder === 'function' ? keyFinder(b) : b[keyFinder];
    
    // aggregate values based on the keys
    if(!a[key]){
      a[key] = [b];
    }else{
      a[key] = [...a[key], b];
    }
    
    return a;
  }, {});
};

console.log(groupBy([6.1, 4.2, 6.3], Math.floor)); 
console.log(groupBy(["one", "two", "three"], "length")); 

// iterator function

function helper(arr){
    let idx = 0;
    const next = function(){
        return this.idx < this.arr.length ? this.arr[this.idx++]: null;
    }
    const done = function(){
        return this.idx === this.arr.length;
    }
    return {
        arr,
        idx: 0,
        next:next,
        done: done
    }
}
const iterator = helper([1, 2, "hello"]);

console.log(iterator.next()); // 1
console.log(iterator.next()); // 2
console.log(iterator.done()); // false
console.log(iterator.next()); // "hello"
console.log(iterator.done()); // true
console.log(iterator.next()); // "null"