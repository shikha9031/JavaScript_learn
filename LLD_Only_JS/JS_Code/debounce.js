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

const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan));
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