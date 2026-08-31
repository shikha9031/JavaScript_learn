function sumResolvedPromises(promiseArr){
    let failed = 0;
    let result = 0;
    let completed = 0;
    return new Promise((resolve, reject)=>{
        promiseArr.forEach((item)=>{
        item.then((val)=>{
            result += val;
            completed++;
        }, error =>{
            failed++;
            if(failed === promiseArr.length){
                return reject("All promises rejected")
            }
        }).finally(()=>{
            if(completed+failed === promiseArr.length){
                resolve(result);
            }
        })
    })
    })
}

const p1 = [
  Promise.resolve(10),
  Promise.reject("error"),
  Promise.resolve(20),
  Promise.reject("fail"),
  Promise.resolve(5),
];
sumResolvedPromises(p1).then(console.log).catch(console.error);
// → 35

const p2 = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
];
sumResolvedPromises(p2).then(console.log).catch(console.error);
// → 6

const p3 = [
  Promise.reject("err1"),
  Promise.reject("err2"),
  Promise.reject("err3"),
];
sumResolvedPromises(p3).then(console.log).catch(console.error);
// → "All promises rejected"


const p4 = [
  Promise.reject("x"),
  Promise.resolve(42),
  Promise.reject("y"),
];
sumResolvedPromises(p4).then(console.log).catch(console.error);
// → 42