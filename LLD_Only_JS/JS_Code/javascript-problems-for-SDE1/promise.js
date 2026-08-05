// Promise All

function task(time){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(time);
        }, time)
    })
}

function taskRejected(time){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(time>2000){
                reject("rejected");
            }
            else{
                resolve(time);
            }
        }, time)
    })
}

const taskList = [task(1000), task(2000), task(3000)];
const taskListRejected = [taskRejected(1000), taskRejected(2000), taskRejected(3000)];

function myPromiseAll(tasks){
    return new Promise((resolve, reject)=>{
        if(tasks.length<=0){
            resolve([]);
            return;
        }
        let isCompleted = 0;
        let result = [];
        tasks.forEach((item, idx)=>{
            Promise.resolve(item).then((res)=>{
                result[idx] = res;
                isCompleted++;
                if(isCompleted === tasks.length){
                    resolve(result);
                }
            }).catch((err)=>{
                reject(err);
            })
        })
    })
}

myPromiseAll(taskList).then((res)=>{
    console.log("got results ", res);
}).catch((err)=>{
    console.log(new Error(err));
})

myPromiseAll(taskListRejected).then((res)=>{
    console.log("got results ", res);
}).catch((err)=>{
    console.log(new Error(err));
})

// Promise Any
function task(time){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(time);
        }, time)
    })
}

function taskRejected(time){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(time>2000){
                reject("rejected");
            }
            else{
                resolve(time);
            }
        }, time)
    })
}

const taskList = [task(1000), task(2000), task(3000)];
const taskListRejected = [taskRejected(3000), taskRejected(2000), taskRejected(3000)];

function myPromiseAny(tasks){
    return new Promise((resolve, reject)=>{
        if(tasks.length<=0){
            resolve([]);
            return;
        }
        let isRejected = 0;
        let errors = [];
        tasks.forEach((item, idx)=>{
            Promise.resolve(item).then((res)=>{
                    resolve(res);
            }).catch((err)=>{
                errors[idx] = err;
                isRejected++;
                if(isRejected === tasks.length){
                    reject(new AggregateError(errors));
                }
            })
        })
    })
}

myPromiseAny(taskList).then((res)=>{
    console.log("got results ", res);
}).catch((err)=>{
    console.log(new Error(err));
})

myPromiseAny(taskListRejected).then((res)=>{
    console.log("got results ", res);
}).catch((err)=>{
    console.log(new Error(err));
})
