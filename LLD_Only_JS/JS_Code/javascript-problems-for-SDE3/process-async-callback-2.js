
function Queue(processorFn, onCompleteFn, concurrency){

    this.taskQueue = [];
    this.functionMap = {};
    this.itemInProcess = 0;

     this.drain = (cb)=>{
        this.functionMap['drain'] = cb;
    }
     this.push = (task)=>{
        if(Array.isArray(task)){
            this.taskQueue.push(...task);
        }
        else{
             this.taskQueue.push(task);
        }
       if(this.itemInProcess<concurrency){
            this.startProcessing();
       }
    }
     this.error = (cb)=>{
        this.functionMap['error'] = cb;
    }
     this.unshift = (task)=>{
         if(Array.isArray(task)){
            this.taskQueue.unshift(...task);
         }
         else{
            this.taskQueue.unshift(task);
         }
        if(this.itemInProcess<concurrency){
            this.startProcessing();
        }
    }
    this.startProcessing = function(){
        if(this.taskQueue.length > 0 && this.itemInProcess<concurrency){
            let tasks = this.taskQueue.splice(0, concurrency);
            for(let task of tasks){
                this.itemInProcess++;
                processorFn(task, (msg, err)=>{
                    if(msg === null){
                        const errorFn = functionMap['error'];
                        errorFn?.(err, task);
                    }
                    else{
                        onCompleteFn(msg, err, task);
                        console.log(msg);
                    }
                    this.itemInProcess--;
                    this.startProcessing();
                })
            }
        }
        if(this.taskQueue.length == 0 && this.itemInProcess === 0){
            const drainFn = this.functionMap['drain'];
            drainFn?.();
        }
    }
    return{
        drain:this.drain,
        push:this.push,
        error:this.error,
        unshift:this.unshift
    }
}

// Update this to become promisified
const processorFn = (task, callback) => {
    setTimeout(() => {
      console.log('Processing task ' + task.name);
      callback(`${task.name} done`);
	// Use in follow up for error scenario implementation
	/* 
	const errorRnd = Math.random() < 0.1;
	if(errorRnd) {
		callback(null, `${task.name} error`);
      }
      */

    }, 500);
}

const onCompleteFn = (data, error, task) => {
    console.log('Task has completed processing: ', task.name, error, Date.now());
}

const myQueue = new Queue(processorFn, onCompleteFn, 2);

// add some items to the queue
myQueue.push({name: 'foo'});

// add some items to the queue (batch-wise)
myQueue.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}]);

// Add items after a certain timeout
setTimeout(() => {
  myQueue.push([{name: 'x'}, {name: 'y'}, {name: 'z'}, {name: 'w'} ]);
}, 600);

// assign a listener when the queue does not have any pending items
myQueue.drain(function() {
    console.log('all items have been processed');
});

// assign an error listener
myQueue.error(function(err, task) {
    console.error('task experienced an error', err, task);
});

// FOLLOW UP: add some items to the front of the queue
// myQueue.unshift({name: 'bar'});
