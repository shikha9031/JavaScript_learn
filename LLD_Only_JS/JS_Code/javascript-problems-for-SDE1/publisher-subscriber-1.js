var publisherSubscriber = function(){
    this.events = [];
}

publisherSubscriber.prototype.subscribe = function(callback){
    this.events.push(callback);
}

publisherSubscriber.prototype.unsubscribe = function(callback){
    this.events = this.events.filter((item) => item !== callback);
}

publisherSubscriber.prototype.fire = function(...args){
    this.events.forEach((item)=>{
        item.apply(this, args);
    })
}

class Observable{
    constructor(){
        this.subsriberArr = [];
    }
    subscribe(fn){
        this.subsriberArr.push(fn);
    }
    unsubscribe(fn){
        this.subsriberArr = this.subsriberArr.filter((item)=> item !== fn);
    }
    notify(msg){
         this.subsriberArr.forEach((item)=>{
            item(msg);
         })
    }
}


//Input:
// 1st observer
const moveHandler = function (item) {
  console.log("fired: " + item);
};

// 2nd observer
const moveHandler2 = function (item) {
  console.log("Moved: " + item);
};

const move = new publisherSubscriber();

// subscribe 1st observer
move.subscribe(moveHandler);
move.fire('event #1');

// unsubscribe 1st observer
move.unsubscribe(moveHandler);
move.fire('event #2');

// subscribe 1st & 2nd observer
move.subscribe(moveHandler);
move.subscribe(moveHandler2);
move.fire('event #3');

// Output:
// "fired: event #1"

// "fired: event #3"

// "Moved: event #3"
