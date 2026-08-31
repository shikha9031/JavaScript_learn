function generateSum(limit){
    let curried = function(...args){
        if(args.length >= limit){
            args = args.slice(0, limit);
            let sum = args.reduce((acc, curr) => acc+curr, 0);
            return sum;
        }
        else{
            const helper = function(...nextArgs){
                return curried(...args, ...nextArgs);
            }
           return helper;
        }
    }
    return curried;
}

const sum = generateSum(4);
console.log(sum(1)(2)(3)(4)); // 10

const sum2 = generateSum(2);
console.log(sum2(5)(2)); // 7

const sum3 = generateSum(2);
console.log(sum3(5)(2, 3, 4)); // 7