function myPromiseAll(taskList){
    let isCompleted = 0;
    let result = [];
    
    return new Promise((resolve, reject) => {
        if(taskList.length<=0){
            resolve([]);
            return;
        }
        taskList.forEach((item, index)=> {
            Promise.resolve(item).then(res=>{
                isCompleted++;
                result[index] = res;
                if(isCompleted === taskList.length){
                    resolve(result);
                }
                
            }).catch(err=>{
                reject(err);
            })
        })
    })
}
function task(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(time);
    }, time);
  });
}

const taskList = [task(1000), task(5000), task(3000)];

//run promise.all
myPromiseAll(taskList)
  .then(results => {
    console.log("got results", results)
  })
  .catch(console.error);

  function any(promises) {
    let isRejected = 0;
    let errors = [];
    
    return new Promise((resolve, reject)=>{
        if(promises.length === 0){
            reject(new AggregateError([], "All promises were rejected"));
            return;
        }
        promises.forEach((item, index) =>{
            Promise.resolve(item).then((res)=>{
                resolve(res);
            }).catch((err)=>{
                isRejected++;
                errors[index] = err;
                if(isRejected === promises.length){
                    reject(new AggregateError(errors, "All promises were rejected"));
                }
            })
        })
    })
}

const test1 = new Promise(function (resolve, reject) {
  setTimeout(reject, 500, 'one');
});

const test2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 600, 'two');
});

const test3 = new Promise(function (resolve, reject) {
  setTimeout(reject, 200, 'three');
});

any([test1, test2, test3]).then(function (value) {
  // first and third fails, 2nd resolves
  console.log(value);
}).catch(function (err){
  console.log(err);
});

