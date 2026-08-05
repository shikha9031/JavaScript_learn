

Array.prototype.filterPolyfill = function(cb, thisArgs){
    if(typeof cb !== 'function'){
        return new Error('Please provide valid function');
    }
    const arr = this;
    let result = [];
    arr.forEach((item, idx)=>{
        let res = cb.call(thisArgs, item, idx, arr);
        if(res){
            result.push(item);
        }
    })
    return result;
}

const arr = [1, 2, 3, 4, 5, 6];
const filtered = arr.filterPolyfill((e)=> e%2 === 0);
console.log(filtered);



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

function groupBy(args, func){
    let result = {};
    args.forEach((item)=>{
        let key = typeof func === 'function'? func(item): item[func];
        if(result[key]){
            result[key].push(item);
        }
        else{
            result[key] = [item];
        }
    });
    console.log(result);
    return result;
}

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