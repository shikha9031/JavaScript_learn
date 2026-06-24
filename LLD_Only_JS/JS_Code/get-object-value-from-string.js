const get = (obj, path) => {
  // if path is not a string or array of string
  if (path === '' || path.length == 0) return undefined;
  
  // if path is an array, concatenate it and form a string
  // to handle a single case of string
  if (Array.isArray(path)) path = path.join('.');
  
  // filter out the brackets and dot
  let exactPath = [];
  for (let i = 0; i < path.length; i++) {
    if (path[i] !== '[' && path[i] !== ']' && path[i] !== '.') {
      exactPath.push(path[i]);
    }
  }
  
  // get the value of the path in the sequence
  const value = exactPath.reduce((source, path) => source[path], obj);
  
  // if not found return undefined
  return value ? value : undefined;
}

let obj = {
  a: {
    b: {
      c: [1,2,3]
    }
  }
};

console.log(get(obj, 'a.b.c')); 
console.log(get(obj, 'a.b.c.0')); 
console.log(get(obj, 'a.b.c[1]')); 
console.log(get(obj, ['a','b','c', '1'])); 
console.log(get(obj, 'a.b.c[3]')); 

// [1,2,3]
// 1
// 2
//2
// undefined