const MY_TIMERS = {
    timer: [],
   setTimeout:function(cb, wait){
    const id = setTimeout(()=>{
        this.timer= this.timer.filter((timerId)=> timerId !== id);
        cb();
    }, wait);
    this.timer.push(id);
    return id;
   },
   clearAllTimeout: function(){
    this.timer.forEach((id)=> clearTimeout(id));
    this.timer = [];
   }
}


const id = MY_TIMERS.setTimeout(() => {console.log("hello")}, 1000);
const id2 = MY_TIMERS.setTimeout(() => {console.log("hello")}, 2000);

console.log(id, id2);

// Clears all the timers
MY_TIMERS.clearAllTimeout();