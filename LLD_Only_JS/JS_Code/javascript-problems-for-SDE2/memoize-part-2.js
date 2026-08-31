function memoize(cb){
    const cache = {
        primitives : new Map(),
        objects: new WeakMap(),
        hasResult: false,
        result: undefined
    }
    return function(...args){
        let node = cache;

        for(let i = 0; i<args.length; i++){
            const arg = args[i];
            const isObject = typeof arg === 'object' && arg !== null;
            if(isObject){
                if(!node.objects.has(arg)){
                    node.objects.set(arg, {
                        primitives : new Map(),
                        objects: new WeakMap(),
                        hasResult: false,
                        result: undefined
                    })
                }
                node = node.objects.get(arg);
            }
            else {
                if(!node.primitives.has(arg)){
                    node.primitives.set(arg, {
                        primitives : new Map(),
                        objects: new WeakMap(),
                        hasResult: false,
                        result: undefined
                    })
                }
                node = node.primitives.get(arg);
            }
        }
        if(node.hasResult){
            console.log('Cache hit!');
            return node.result;
        }
         // Compute and cache the result
        console.log('Cache miss - computing...');
        const result = cb.apply(this, args);
        node.result = result;
        node.hasResult = true;
        return result;
    }
}


//1st Function

const add = memoize((a, b, c) => {
  console.log(`Computing: ${a} + ${b} + ${c}`);
  return a + b + c;
});

console.log(add(1, 2, 3)); // Cache miss
console.log(add(1, 2, 3)); // Cache hit
console.log(add(1, 2, 4)); // Cache miss (different args)

//2nd Function
const obj1 = { id: 1 };
const obj2 = { id: 2 };

const processObject = memoize((obj, multiplier) => {
  console.log(`Processing object with id: ${obj.id}, multiplier: ${multiplier}`);
  return obj.id * multiplier;
});

console.log(processObject(obj1, 5)); // Cache miss
console.log(processObject(obj1, 5)); // Cache hit (same object reference)
console.log(processObject(obj2, 5)); // Cache miss (different object)
console.log(processObject(obj1, 5)); // Cache hit
console.log(processObject(obj1, 10)); // Cache miss (different multiplier)

// 3rd function

const mixedFn = memoize((num, str, obj, bool) => {
  console.log(`Mixed args: ${num}, ${str}, ${obj.name}, ${bool}`);
  return `${num}-${str}-${obj.name}-${bool}`;
});

const person1 = { name: 'Alice' };
const person2 = { name: 'Bob' };

console.log(mixedFn(1, 'test', person1, true)); // Cache miss
console.log(mixedFn(1, 'test', person1, true)); // Cache hit
console.log(mixedFn(1, 'test', person2, true)); // Cache miss (different object)
console.log(mixedFn(1, 'test', person1, false)); // Cache miss (different boolean)

//4th Function
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.time('First call');
console.log(`fib(35) = ${fibonacci(35)}`);
console.timeEnd('First call');
// First call: 1ms - timer ended 

console.time('Second call');
console.log(`fib(35) = ${fibonacci(35)}`);
console.timeEnd('Second call');
//Cache hit!
//Second call: 0ms

//5th Function
const noArgs = memoize(() => {
  console.log('Computing with no arguments');
  return Math.random();
});

console.log(noArgs()); // Cache miss
console.log(noArgs()); // Cache hit (same value returned)