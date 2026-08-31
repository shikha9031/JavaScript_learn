const _ = Symbol("placeholder");
function curry(cb, limit = cb.length){
    const helper = function(...args){
        const filledCount = args.filter(arg => arg !== _).length;
        if(filledCount >= limit){
            return cb.apply(this, args.slice(0,limit));
        }
        else{
            const temp = function(...newArgs){
                const merged = [...args];
                for(let arg of newArgs){
                    const placeholdeIdx = merged.indexOf(_);
                    if(placeholdeIdx !== -1){
                        merged[placeholdeIdx] = arg;
                    }
                    else{
                        merged.push(arg);
                    }
                }
                return helper(...merged);
            }
            return temp;
        }
    }
    return helper;
}
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(_, _, 3)(_, 1)(3)); 
// 7

const greet = (greeting, name, punctuation) => 
  `${greeting}, ${name}${punctuation}`;

const sayHello = curry(greet)('Hello');
console.log(sayHello('Alice')('!'));        // "Hello, Alice!"

const greetBob = curry(greet)(_, 'Bob');
console.log(greetBob('Hi')('!'));           // "Hi, Bob!"

const askBob = curry(greet)(_, 'Bob', _);
console.log(askBob('You')('?'));           // "You, Bob?"