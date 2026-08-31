const state = {
    REJECTED:'REJECTED',
    PENDING:'PENDING',
    FULFILLED: 'FULFILLED'
}
class MyPromise{
    constructor(executor){
        this.state = state.PENDING;
        this.value = undefined;
        this.handlers = [];

        const resolve = (value) =>{
            if(this.state !== state.PENDING){
                return;
            }
            if(value instanceof Promise){
                value.then(resolve, reject);
                return;
            }
            this.state = state.FULFILLED;
            this.value = value;
            this.runHanlders();
        }
        const reject = (reason) =>{
            if(this.state !== state.PENDING){
                return;
            }
            this.state = state.REJECTED;
            this.value = reason;
            this.runHanlders();
        }
        try{
            executor(resolve, reject);
        }
        catch(err){
            reject(err);
        }
    }
    then(onFulfilled, onRejected){
        return new MyPromise((resolve, reject)=>{
            this.handlers.push({
                onFulfilled,
                onRejected,
                resolve,
                reject
            });
            this.runHanlders();
        })
    }
    catch(onRejected){
        return this.then(null, onRejected);
    }
    finally(callback){
        return this.then((value) => {
            callback();
            return value;
        },(error)=>{
            callback();
            throw error;
        })
    }
    runHanlders(){
        if(this.state === state.PENDING){
            return;
        }
        setTimeout(()=>{
            while(this.handlers.length > 0){
                const handler = this.handlers.shift();
                const callback = this.state === state.FULFILLED ?
                handler.onFulfilled: handler.onRejected;
                if(typeof callback !== "function"){
                    if(this.state === state.FULFILLED){
                        handler.resolve(this.value);
                    }
                    else{
                        handler.reject(this.value);
                    }
                    continue;
                }
                try {
                    const result = callback(this.value);
                    handler.resolve(result);
                }
                catch(err){
                    handler.reject(err);
                }
            }
        }, 0)
    }
}

const promise1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("hello");
  }, 1000);
});

promise1.then((value) => {
  console.log(value);
});

// Output:
// "hello"

//Input:
const promise2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject("error");
  }, 2000);
});

promise2.catch((e) => {
  console.error(e);
});

// Output:
// "error"

//Input:
const promise3 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("hello");
  }, 2000);
});

promise3.then((value) => {
  return value + " " + 2000;
}).then((val2) => {
  console.log(val2);
}).finally(() => {
  console.log(`Finally`);
});

// Output:
// "hello 2000"
// "Finally"