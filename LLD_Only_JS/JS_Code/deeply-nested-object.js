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