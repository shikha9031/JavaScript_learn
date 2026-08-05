const wait = (ms)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve();
        }, ms)
    })
}

async function retryWithDelay(asyncFn, retries = 3, delay = 50, finalError = 'Failed'){
    try{
       await asyncFn()
    }
    catch(err){
        if(retries <= 0){
            return Promise.reject(finalError);
        }
        await wait(delay);
        return retryWithDelay(asyncFn, retries-1, delay, finalError);
    }
}

const getTestFunc = ()=>{
    let callCounter = 0;
    return async()=>{
        callCounter++;
        if(callCounter<5){
            throw new Error("Not Yet");
        }
    }
}

const test = async ()=>{
    await retryWithDelay(getTestFunc(), 10);
    console.log("Success");
    await retryWithDelay(getTestFunc(), 3);
    console.log("Will fail before getting here");
}

test().catch(console.error);