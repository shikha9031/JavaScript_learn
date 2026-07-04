function ClassNames(...args){
  let classes = '';
  for(let arg of args){
    // if arg is truthy value
    // then process it
    if(arg){
      const newClass = processArg(arg);
      classes = appendClass(classes, newClass);  
    }
  }
  
  return classes;
};

function processArg(arg){
  // return the class as it is 
  if(typeof arg === 'string'){
    return arg;
  }
   
  // convert the class to a string
  if(typeof arg === 'number'){
    return ""+arg;
  }
  
  // return empty string if no value
  if(typeof arg !== 'object'){
    return '';
  }
  
  // if arg is array, spread all of its value as arguments to the main function and 
  // recursively call it for processing
  if(Array.isArray(arg)){
    return ClassNames(...arg);
  }
  
  // if the arg is object, check if the key is its own property (avoid checking in prototype chain)
  // and if its value is truthy create a string of classes and return it
  let classes = '';
  for(let key in arg){
    if(arg.hasOwnProperty(key) && arg[key]){
      const newClass = processArg(key);
      classes = appendClass(classes, newClass); 
    }
  }
  
  return classes;
}

function appendClass(existingClasses, newClass){
  if(!newClass) return existingClasses;
  return existingClasses ? (existingClasses + ' ' + newClass) : newClass;
}

console.log(ClassNames('foo', 'bar')); // => 'foo bar'
console.log(ClassNames('foo', { bar: true })); // => 'foo bar'
console.log(ClassNames({ 'foo-bar': true })); // => 'foo-bar'
console.log(ClassNames({ 'foo-bar': false })); // => ''
console.log(ClassNames({ foo: true }, { bar: true })); // => 'foo bar'
console.log(ClassNames({ foo: true, bar: true })); // => 'foo bar'

// lots of arguments of various types
console.log(ClassNames('foo', { bar: true, duck: false }, 'baz', { quux: true })); // => 'foo bar baz quux'

// // other falsy values are just ignored
console.log(ClassNames(null, false, 'bar', undefined, 0, -1, { baz: null }, '')); // => 'bar 1'

const arr = ['b', { c: true, d: false }];
console.log(ClassNames('a', arr)); // => 'a b c'

let buttonType = 'primary';
console.log(ClassNames({ [`btn-${buttonType}`]: true }));