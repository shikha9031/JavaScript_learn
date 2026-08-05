class Events{
    constructor(){
        this.subscribeEvents = {};
        this.subscribeOnceEvents = {};
        this.subscribeOnceAsyncEvents = {};
    }
    subscribe(name, callback){
        if(!this.subscribeEvents[name]){
            this.subscribeEvents[name] = [];
        }
        this.subscribeEvents[name].push(callback);
        return {
            remove: ()=>{
                const events = this.subscribeEvents[name];
                const filterEvent = events.filter((item)=> item !== callback);
                this.subscribeEvents[name] = filterEvent;
            }
        }
    }
    subscribeOnce(name, callback){
         if(!this.subscribeOnceEvents[name]){
            this.subscribeOnceEvents[name] = [];
        }
        this.subscribeOnceEvents[name].push(callback);
    }
    async subscribeOnceAsync(name){
         return new Promise((resolve, reject)=>{
            if(!this.subscribeOnceAsyncEvents[name]){
                this.subscribeOnceAsyncEvents[name] = [];
            }
                this.subscribeOnceAsyncEvents[name].push(resolve);
         })
    }
    publish(name, data){
        const subscribeCallback = this.subscribeEvents[name] || [];
        subscribeCallback.forEach((cb)=>{
            cb(data);
        })
        const subscribeOnceCallback = this.subscribeOnceEvents[name] || [];
        subscribeOnceCallback.forEach((cb)=>{
            cb(data);
        })
        this.subscribeOnceEvents[name] = [];

        const subscribeOnceAsyncCallback = this.subscribeOnceAsyncEvents[name] || [];
        subscribeOnceAsyncCallback.forEach((cb)=>{
            cb(data);
        })
        this.subscribeOnceAsyncEvents[name] = [];
    }
    publishAll(data){
        for(let [key, events] of Object.entries(this.subscribeEvents)){
            events.forEach((cb)=>{
                 cb(data);
            })
        }
    }
}

// Test cases
const events = new Events();

const newUserNewsSubscription = events.subscribe("new-user", function (payload) {
  console.log(`Sending Q1 News to: ${payload}`);
});

events.publish("new-user", "Jhon");

//output: "Sending Q1 News to: Jhon"

const newUserNewsSubscription2 = events.subscribe("new-user", function (payload) {
  console.log(`Sending Q2 News to: ${payload}`);
});

events.publish("new-user", "Doe");

//output: "Sending Q1 News to: Doe"
//output: "Sending Q2 News to: Doe"

newUserNewsSubscription.remove(); // Q1 news is removed

events.publish("new-user", "Foo");
//output: "Sending Q2 News to: Foo"

events.publishAll("FooBar");
//output: "Sending Q2 News to: FooBar"

events.subscribeOnce("new-user", function (payload) {
  console.log(`I am invoked once ${payload}`);
});

events.publish("new-user", "Foo Once");
//output: "Sending Q2 News to: Foo Once" - normal event
//output: "I am invoked once Foo Once" - once event

events.publish("new-user", "Foo Twice");
//output: "Sending Q2 News to: Foo Twice" - normal event
// once event should not invoke for second time


events.subscribeOnceAsync("new-user").then(function (payload) {
  console.log(`I am invoked once ${payload}`);
});

events.publish("new-user", "Foo Once Async");
//output: "Sending Q2 News to: Foo Once Async"
//output: "I am invoked once Foo Once Async"
