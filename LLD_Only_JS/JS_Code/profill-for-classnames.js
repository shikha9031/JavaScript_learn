function classNames(...args){
         let cssClass = '';
        for(let arg of args){
                let value = processArg(arg);
                if(value){
                    cssClass = cssClass + (cssClass ?  " " : "" ) + value;
                }
        }
    return cssClass;
}

function processArg(arg){
    if(typeof arg === 'string'){
        return arg;
    }
    else if(typeof arg === 'number' && arg !== 0){
        return arg;
    }
    else if(!arg){
        return "";
    }
    else if(Array.isArray(arg)){
        return classNames(...arg);
    }
    else if(typeof arg === 'object' && arg !== null && Object.prototype === Object.getPrototypeOf(arg)){
        let ans = '';
        for(let [key, value] of Object.entries(arg)){
            if(value){
                ans = ans + " " + key;
            }
        }
        return ans.trim();
    }
}

console.log(classNames('foo', 'bar')); // => 'foo bar'
console.log(classNames('foo', { bar: true })); // => 'foo bar'
console.log(classNames({ 'foo-bar': true })); // => 'foo-bar'
console.log(classNames({ 'foo-bar': false })); // => ''
console.log(classNames({ foo: true }, { bar: true })); // => 'foo bar'
console.log(classNames({ foo: true, bar: true })); // => 'foo bar'

// lots of arguments of various types
console.log(classNames('foo', { bar: true, duck: false }, 'baz', { quux: true })); // => 'foo bar baz quux'

// other falsy values are just ignored
console.log(classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, '')); // => 'bar 1'

let buttonType = 'primary';
console.log(classNames({ [`btn-${buttonType}`]: true }));
const arr = ['b', { c: true, d: false }];
console.log(classNames('a', arr)); // => 'a b c'

