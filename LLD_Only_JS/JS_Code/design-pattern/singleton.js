// in Singleton pattern only once object is created for each class and functions and same function is returned everytime
// Creating Singleton using pattern
// Function with Closure
const singleton = function(){
    let instance;
    function createInstance(){
        const object = new Object(" I an the Instance ");
        return object;
    }
    return {
        getInstance: function() {
            if(!instance){
               instance = createInstance();
            }
            return instance;
        }
    }
}


let singletonInstance = singleton();

let object1 = singletonInstance.getInstance();
let object2 = singletonInstance.getInstance();
console.log(object1 === object2);


// Class
class SingletonClass {
  constructor() {
    if (SingletonClass.instance) {
      return SingletonClass.instance;
    }
    this.data = {};
    SingletonClass.instance = this;
    return this;
  }

  setData = function (key, value) {
    this.data[key] = value;
  };
  getData = function (key) {
    return this.data[key];
  };
}

const in1 = new SingletonClass();
const in2 = new SingletonClass();

console.log(in1 === in2);
in1.setData("name", "ben");
in2.setData("age", 14);

console.log("Name", in2.getData("name"), "Age", in1.getData("age"));
