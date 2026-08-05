// my solution 
let result = {};
function flatten(obj, newKey = []){
    for(let [key, value] of Object.entries(obj)){
        if(isObject(value)){
            newKey.push(key);
            flatten(value, newKey);
            newKey.pop();
        }
        else if(Array.isArray(value)){
           
            newKey.push(key);
            const nestedKey = newKey.join(".");
            for(let i = 0; i<value.length; i++){
                let arrayKey = nestedKey + "." + i;
                result[arrayKey] = value[i];
            }
            newKey.pop();
        }
        else{
            newKey.push(key);
            const nestedKey = newKey.join(".");
            result[nestedKey] = value;
            newKey.pop();
        }
    }
    return result;
}

function isObject(obj){
    return obj !== null && typeof obj === 'object' && Object.prototype === Object.getPrototypeOf(obj)
}

// Chat GPT Solution

function flatten(obj) {
    const result = {};

    function dfs(curr, path = []) {
        for (const [key, value] of Object.entries(curr)) {
            path.push(key);

            if (Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    const item = value[i];

                    if (
                        item !== null &&
                        typeof item === "object"
                    ) {
                        dfs(item, [...path, String(i)]);
                    } else {
                        result[[...path, i].join(".")] = item;
                    }
                }
            } else if (
                value !== null &&
                typeof value === "object"
            ) {
                dfs(value, path);
            } else {
                result[path.join(".")] = value;
            }

            path.pop();
        }
    }

    dfs(obj);
    return result;
}


// Get object value from string path

const get = (obj, path)=>{
    if(path === '' || path.length === 0){
        return undefined;
    }
    if(Array.isArray(path)){
        path = path.join(".");
    }
    let exactPath = [];
    for(let i = 0; i<path.length; i++){
        if(path[i] !== '[' && path[i] !== ']' && path[i] !== '.'){
            exactPath.push(path[i]);
        }
    }
    const value = exactPath.reduce((acc, curr)=> acc[curr], obj);
    return value ? value: undefined;
}

const obj = {
  a: {
    b: {
      c: [1,2,3]
    }
  }
};

console.log(get(obj, 'a.b.c')); 
console.log(get(obj, 'a.b.c.0')); 
console.log(get(obj, 'a.b.c[1]')); 
console.log(get(obj, 'a.b.c[3]')); 
console.log(get(obj, 'a.c')); 

function filterObj(obj, cb){
    function helper(obj){
        let resultObj = {};
        for(let [key, val] of Object.entries(obj)){
            if(typeof val === 'object'){
                const filtered = helper(val);
                 if(Object.keys(filtered).length > 0) {
                    resultObj[key] = filtered;
                }
            }
            if(cb(val)){
                resultObj[key] = val;
            }
        }
        return resultObj;
    }
    
    console.log(helper(obj));
}

const obj = {
  a: 1,
  b: {
    c: "Hello World",
    d: 2,
    e: {
     f: {
       g: -4,
      },
    },
    h: "Good Night Moon",
  },
};

const filter = (s) => typeof s === "string";

filterObj(obj, filter);