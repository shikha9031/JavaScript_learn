const btn = document.getElementById('test-btn');

btn.addEventListener('click', debounce(function() {
  console.info('HOLA! Learnersbucket');
}, 3000));

function debounce(callback, wait){
  let timer = 0;
  return function(...arg){
    clearTimeout(timer);
    timer = setTimeout(()=>{
      callback.call(this, ...arg);
    }, wait)
  }
}

// throttle


function throttle(cb, wait){
    let timer = null;
    let lastArgs = null;
    let lastContext = null;
    function invoke(){
        if(lastArgs === null){
            timer = null;
            return;
        }
        cb.apply(lastContext, lastArgs);
        lastArgs = null;
        lastContext = null;
        timer = setTimeout(invoke, wait);
    }
    return function(...args){
        if(!timer){
            cb.apply(this, args);
            timer = setTimeout(invoke, wait);
        }
        else{
            lastArgs = args;
            lastContext = this;
        }
    }
}

// Implement clearTimeOut

const MY_TIMERS = {
    timers: new Set(),
    setTimeout: function(fun, wait){
        const timer = setTimeout(()=>{
            fun();
            this.timers.delete(timer);
        }, wait);
        this.timers.add(timer);
        return timer;
    },
    clearAllTimeout:function(){
        if(this.timers.length>0){
            this.timers.forEach((timer)=> clearTimeout(timer));
            this.timers = [];
        }
    }
}

//Implement memoize
function factorial(n){
    if( n === 0 || n === 1){
        return 1;
    }
    return factorial(n-1)*n;
}

function memoize(cb){
    let map = new Map();
    return function(num){
        if(map.has(num)){
            return map.get(num);
        }
        let res = cb.call(this, num);
        map.set(num, res);
        return res;
    }
}
const memoizedFactorial = memoize(factorial);
let a = memoizedFactorial(100);
console.log(a);
let b = memoizedFactorial(100) // faster
console.log(b);
