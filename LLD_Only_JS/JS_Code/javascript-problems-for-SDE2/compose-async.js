function composeAsync(...callbacks) {
    return async function (...args) {
        const reversed = [...callbacks].reverse();

        let result = await reversed[0](...args);

        for (let i = 1; i < reversed.length; i++) {
            result = await reversed[i](result);
        }

        return result;
    };
}
// function composeAsync(...callbacks) {
//     return function (...args) {
//         const reversed = [...callbacks].reverse();

//         return reversed.slice(1).reduce(
//             (promise, fn) => promise.then(fn),
//             Promise.resolve().then(() => reversed[0](...args))
//         );
//     };
// }

function composeAsync(...callbacks) {
    return (...args) => {
        const reversed = [...callbacks].reverse();

        return reversed.reduce((promise, fn, index) => {
            if (index === 0) {
                return Promise.resolve(fn(...args));
            }

            return promise.then(fn);
        }, Promise.resolve());
    };
}

function a(x, y) {
  return new Promise(resolve => setTimeout(() => resolve(x * y), 100));
}

function b(z) {
  return new Promise((resolve, reject) => setTimeout(() => resolve(z + 5), 100));
}

function c(r) {
  return new Promise(resolve => setTimeout(() => resolve(r / 10), 100));
}

// create this function
composeAsync(c, b, a)(5, 3).then(result => { console.log(result); }).catch(console.error);