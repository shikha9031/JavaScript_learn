
class PromiseSchedular{
    constructor(promises, options){
        this.promise = promises;
        this.startIndex = options.startIndex ?? 0;
        this.callbacks = options.callback ?? {};
        this.promiseExecutedIndices = Object.keys(promises).reduce((a,b)=> {
            a[b] = false;
            return a;
        }, {});
        this.isProcessing = false;
        this.runningAllUnexecuted = false;
    }

    async processHelper(){
        if(!this.isProcessing){
            return;
        }
        if(this.promiseExecutedIndices[this.startIndex]){
            this.isProcessing = false;
            this.runningAllUnexecuted = false;
            this.callbacks?.onCompleted?.();
            return;
        }
        this.promiseExecutedIndices[this.startIndex] = true;
        const promise = this.promise[this.startIndex++];
        try{
            await promise();
        }
        catch(e){
            console.log("Error while processing promise");
        }
        finally{
            if(this.startIndex<this.promise.length){
                this.processHelper();
            }
            else{
                this.isProcessing = false;
                if(this.unexecutedFunctionsIndices().length == 0){
                    this.callbacks.onCompleted();
                }
                else{
                    if(this.runningAllUnexecuted){
                        this.runAllUnexecutedFunctions();
                    }
                }
            }
        }
    }
    run(){
        this.isProcessing = true;
        this.processHelper();
        this.callbacks.onStart?.();
    }
    async pause(){
        this.isProcessing = false;
        this.runningAllUnexecuted = false;
        this.callbacks.onPause();
    }
    getState(){
        const unExecutedFunctionIndices = this.unexecutedFunctionsIndices();

        const state = (()=>{
            const promisePending = unExecutedFunctionIndices.length > 0;
            if(promisePending){
                if(this.isProcessing){
                    return 'Processing';
                }
                else{
                    return 'Paused in between';
                }
            }
            else{
                return 'completed';
            }
        })()
        return {state, unExecutedFunctionIndices};

    }
    unexecutedFunctionsIndices = ()=>{
        return Object.keys(this.promiseExecutedIndices).filter((e)=> {
            return this.promiseExecutedIndices[e] === false;
        })
    }
    runAllUnexecutedFunctions = ()=>{
        if(this.unexecutedFunctionsIndices().length === 0){
            return;
        }
        this.isProcessing = true;
        this.runningAllUnexecuted = true;

        if(this.startIndex !== this.promise.length){
            this.run();
        }
        else{
            this.startIndex = 0;
            this.run();
        }
    }
}

const delay = (duration = 5000) => {
    return new Promise((resolve)=> setTimeout(()=> resolve(true), duration));
}

const imageLoad = ()=>{
    return new Promise((resolve, reject)=>{
        const image = new Image();
        image.onload = ()=>{
            resolve(image);
        }
        image.onerror = ()=>{
            reject();
        }
        image.src = 'image.png';
        return true;
    })
}

const randomFunction = async () =>{
    await delay(6000);
    return true;
}

const randomFunction2 = async () =>{
    await delay(8000);
    return true;
}

const promises = [delay, imageLoad, ()=>{}, randomFunction, randomFunction2];
const callback = {
    onCompleted: ()=>{
        console.log('completed');
    },
    onPause: () =>{
        console.log('pause');
    },
    onStart: ()=>{
        console.log('execution started and it is in progress');
    }
}

const promiseSchedular = new PromiseSchedular(promises, {startIndex: 1, callback});
promiseSchedular.run();

setTimeout(() => {
  console.log(promiseSchedular.getState());
  promiseSchedular.pause();
  console.log(promiseSchedular.getState());
  console.log('------------');
}, 3000);

setTimeout(() => {
  console.log(promiseSchedular.getState());
  promiseSchedular.runAllUnexecutedFunctions();
  console.log(promiseSchedular.getState());
  console.log('------------');
}, 5000);

