/*
type Task = any;

type Queue = (ProcessorFn, OnCompleteFn, concurrency: number) => QueueObject

type QueueObject = {
  drain: (callbackFn() => void) => void;
  push: (Task or Array) => void; // add to the end
  error: (callbackFn(error?: Error, Task) => void) => void;
  unshift: (Task or Array) => void; // add to the front
}

type ProcessorFn = (Task, CallbackFn) => void

type OnCompleteFn = (data: any, error: Error, Task) => void

type CallbackFn = (data: any, error?: Error) => void

*/
function Queue(processorFn, onCompleteFn, concurrency){
    // write your code here
    this.queue = [];
    this.executingTask = 0;
    this.functionMap = {};
    this.push = (task)=>{
        task = Array.isArray(task) ? task : [task];
        this.queue.push(...task);
        if(this.executingTask<concurrency){
            this.startProcessing();
        }
    }
    this.unshift = (task)=>{
        task = Array.isArray(task) ? task : [task];
        this.queue.unshift(...task);
        if(this.executingTask<concurrency){
            this.startProcessing();
        }
    }
    this.drain = (fn)=>{
        this.functionMap['drain'] = fn;
    }
    this.error = (fn)=>{
        this.functionMap['error'] = fn;
    }
    this.startProcessing = ()=>{
        if(this.queue.length>0 && this.executingTask<concurrency){
            let tasks = this.queue.splice(0, concurrency);
            tasks.forEach((task, idx)=>{
                this.executingTask++;
                processorFn(task, (msg, err)=>{
                    if(msg === null){
                        const errorFn = this.functionMap['error'];
                        errorFn?.(err, task);
                    }
                    else{
                        onCompleteFn(msg, err, task);
                        console.log(msg);
                    }
                })
                this.executingTask--;
                this.startProcessing();
            })
        }
        if(this.queue.length <=0 && this.executingTask === 0){
            const drainFn = this.functionMap['drain'];
            drainFn?.();
        }
    }
    return {
        push: this.push,
        unshift: this.unshift,
        drain: this.drain,
        error: this.error
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