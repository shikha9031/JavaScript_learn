//simple example
const calculator = {
  total: 0,
  add: function(val){
    this.total += val;
    return this;
  },
  subtract: function(val){
    this.total -= val;
    return this;
  },
  divide: function(val){
    this.total /= val;
    return this;
  },
  multiply: function(val){
    this.total *= val;
    return this;
  }
};

calculator.add(10).subtract(2).divide(2).multiply(5);
console.log(calculator.total);

// using function 

const CALC = function(){
  this.total = 0;

  this.add = (val) => {
    this.total += val;
    return this;
  }

  this.subtract = (val) => {
    this.total -= val;
    return this;
  }

  this.multiply = (val) => {
    this.total *= val;
    return this;
  }

  this.divide = (val) => {
    this.total /= val;
    return this;
  }

  this.value = () => this.total;
}

const calculator = new CALC();
calculator.add(10).subtract(2).divide(2).multiply(5);
console.log(calculator.total);

// Curry - part 1


function curry(){
    let calculatedValue = 0;
    return function(args){
        calculatedValue += args;
        return calculatedValue;
    }
}

const sum = curry();

console.log(sum(5)); // 5
console.log(sum(3)); // 8
console.log(sum(4)); // 12
console.log(sum(0)); // 12

//publisher-subscription part - 1
class Observable{
    constructor(){
        this.obj = [];
    }
    subscribe(fn){
        this.obj.push(fn);
        return {
            unsubscribe: ()=>{
                this.obj = []
            }
        }
    }
    notify(args){
        this.obj.forEach((item)=> {
            item.call(this, args);
        })
    }
}

const observable = new Observable();

// Subscribe to changes
const subscription = observable.subscribe(data => {
  console.log('Received:', data);
});

// Notify subscribers
observable.notify('Hello!'); // logs: "Received: Hello!"

// Unsubscribe
subscription.unsubscribe();

// No longer logs anything
observable.notify('Hello again!');