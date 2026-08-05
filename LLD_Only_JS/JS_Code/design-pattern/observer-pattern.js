// Simple implementation

const Move = function(){
  this.handlers = [];
  
  this.subscribe = function (fn) {
    this.handlers.push(fn);
  };

  this.unsubscribe = function (fn) {
    this.handlers = this.handlers.filter((item) => item !== fn);
  };

  this.fire = function (o, thisObj) {
    const scope = thisObj || window;
    this.handlers.forEach((item) => {
      item.call(scope, o);
    });
  }
}


//Input: 1st observer
const moveHandler = function (item) {
  console.log("fired: " + item);
};

// 2nd observer
const moveHandler2 = function (item) {
  console.log("Moved: " + item);
};

const move = new Move();

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

// Coursera Interview. complexity increases
/**
 * subscribe(name, callback): Will take the name of the event and assign a callback to it. This callback will be invoked when the event is published. It returns a remove() method to unsubscribe the event.
 * subscribeOnce(name, callback): Will take the name of the event and assign a callback to it. This event will be published only once.
 * subscribeOnceAsync(name): Will take the name of the event and returns a promise that is settled or fullfilled when the event is published.
 * publish(name, data): Publish a single event and pass the data to the callback of each events. If the event is subscribed only once, it should not invoke twice.
 * publishAll(name): Publishes all events and passes the data to the callback of each events. If the event is subscribed only once, it should not invoke twice.
 */
class Events {
    constructor(){
        this.subscriptionList = new Map();
        this.subscribeOnceList = new Map();
        this.subscribeOnceAsyncList = new Map();
    }

  subscribe = function (name, callback) {
     if (!this.subscriptionList.has(name)) {
      this.subscriptionList.set(name, [callback]);
    } else {
      const exisitngCallbacks = this.subscriptionList.get(name);
      this.subscriptionList.set(name, [...exisitngCallbacks, callback]);
    }

    return {
      remove: () => {
        const exisitngCallbacks = this.subscriptionList.get(name);
        const filtered = exisitngCallbacks.filter((e) => e !== callback);
        this.subscriptionList.set(name, filtered);
      }
    }
  };

  subscribeOnce = function (name, callback) {
     if (!this.subscribeOnceList.has(name)) {
      this.subscribeOnceList.set(name, [callback]);
    } else {
      const exisitngCallbacks = this.subscribeOnceList.get(name);
      this.subscribeOnceList.set(name, [...exisitngCallbacks, callback]);
    }
  };

  subscribeOnceAsync = async function (name) {
     return new Promise((resolve, reject) => {
      if (!this.subscribeOnceAsyncList.has(name)) {
        this.subscribeOnceAsyncList.set(name, [resolve]);
      } else {
        const exisitngCallbacks = this.subscribeOnceAsyncList.get(name);
        this.subscribeOnceAsyncList.set(name, [...exisitngCallbacks, resolve]);
      }
    });
  };

  publish = function (name, data) {
    const callbacks = this.subscriptionList.get(name) || [];
    callbacks.forEach((e) => {
      e(data);
    });

    const subscribeOnceCallbacks = this.subscribeOnceList.get(name) || [];
    subscribeOnceCallbacks.forEach((e) => {
      e(data);
    });

    this.subscribeOnceList.set(name, []);

    const subscribeOnceAsyncCallbacks =
      this.subscribeOnceAsyncList.get(name) || [];
    subscribeOnceAsyncCallbacks.forEach((e) => {
      e(data);
    });

    this.subscribeOnceAsyncList.set(name, []);
  };

  publishAll = function (data) {
     const entries = this.subscriptionList.entries();
    for (let [key, value] of entries) {
      value.forEach((e) => {
        e(data);
      });
    }
  };
}

const events = new Events();

const newUserNewsSubscription = events.subscribe("new-user", function (
  payload
) {
  console.log(`Sending Q1 News to: ${payload}`);
});

events.publish("new-user", "Jhon");

//"Sending Q1 News to: Jhon"

const newUserNewsSubscription2 = events.subscribe("new-user", function (
  payload
) {
  console.log(`Sending Q2 News to: ${payload}`);
});

events.publish("new-user", "Doe");

//"Sending Q1 News to: Doe"
//"Sending Q2 News to: Doe"

newUserNewsSubscription.remove(); // Q1 news is removed

events.publish("new-user", "Foo");
//"Sending Q2 News to: Foo"

events.publishAll("FooBar");
//"Sending Q2 News to: FooBar"

events.subscribeOnce("new-user", function (payload) {
  console.log(`I am invoked once ${payload}`);
});

events.publish("new-user", "Foo Once");
//"Sending Q2 News to: Foo Once" - normal event
//"I am invoked once Foo Once" - once event

events.publish("new-user", "Foo Twice");
//"Sending Q2 News to: Foo Twice" - normal event
// once event is not invoked second time


events.subscribeOnceAsync("new-user").then(function (payload) {
  console.log(`I am invoked once ${payload}`);
});

events.publish("new-user", "Foo Once Async");
//"Sending Q2 News to: Foo Once Async"
//"I am invoked once Foo Once Async"
