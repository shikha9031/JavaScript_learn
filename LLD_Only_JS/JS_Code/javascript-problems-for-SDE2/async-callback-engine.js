class AsyncCallbacksClass{
    constructor(order, concurrentTasks = 2){
        this.callBackqueue = [];
        this.ongoingExecution = 0;
        this.order = order;
        this.allowedConcurrentTask = concurrentTasks;
    }
    process(cb){
        if(this.ongoingExecution<this.allowedConcurrentTask){
            this.ongoingExecution++;
            cb.then((idx)=>{
                console.log(idx)
            }).finally(()=>{
                this.ongoingExecution--;
                this.executeNext();
            })
        }
        else{
            if(this.callBackqueue.length <6){
                this.callBackqueue.push(cb);
            }
        }
    }
    executeNext(){
        if(this.callBackqueue.length>0 && this.ongoingExecution<this.allowedConcurrentTask){
            let nextTask = this.order === 'LIFO' ? this.callBackqueue.pop(): this.callBackqueue.shift();
            this.process(nextTask);
        }
    }
}

let dummyApi = (index) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(index);
    }, index * 1000);
  })
};

//Input:
const asyncCallbacks = new QueueCallbacks('FIFO', 2, 8);
asyncCallbacks.process(()=> dummyApi(1));
asyncCallbacks.process(() => dummyApi(2));
asyncCallbacks.process(() => dummyApi(6));
asyncCallbacks.process(() => dummyApi(4));
asyncCallbacks.process(() => dummyApi(5));
asyncCallbacks.process(() => dummyApi(6));
asyncCallbacks.process(() => dummyApi(7));
asyncCallbacks.process(() => dummyApi(8));
asyncCallbacks.process(() => dummyApi(9));
asyncCallbacks.process(() => dummyApi(10));

//Output:
1 // this will execute first
2 // this will execute second
4 // this will execute after 2 seconds
5 // all of the remaining will execute after 1 second there after
6
6
7
8
9
10

//Followup - Each task should have a unique task ID and support success and error callbacks. The design should also allow setting a custom executor to define how  tasks are executed (for example, to add logging, retries, or rate limiting).Let's update the dummyApi function so that it has unique task Id and support success and error callbacks.let taskCounter = 0;

function dummyApi(
  delay,
  shouldFail = false,
  {
    onSuccess,
    onError
  } = {}
) {
  const taskId = `task-${++taskCounter}`;

  return {
    id: taskId,

    execute: () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (shouldFail) {
            reject(new Error(`Failed after ${delay}s`));
          } else {
            resolve(`Completed in ${delay}s`);
          }
        }, delay * 1000);
      }),

    onSuccess,
    onError
  };
}

const defaultExecutor = async (task) => {
  console.log(`Starting ${task.id}`);

  try {
    const result = await task.execute();
    task.onSuccess?.(result, task.id);
  } catch (err) {
    task.onError?.(err, task.id);
  }

  console.log(`Finished ${task.id}`);
};

const QueueCallbacks = function(order = 'FIFO', concurrentTasks = 2, queueLimit = Infinity, executor = defaultExecutor){
  this.order = order;
  this.allowedConcurrentTasks = concurrentTasks;
  this.queueLimit = queueLimit;
  this.callbacksQueue = [];
  this.ongoingExecution = 0;
  this.executor = executor;
  
  this.process = (task) => {
    // if there less than k callbacks are being executed, execute the callback immediately
    // once the callback execution has begun, update the ongoing execution count
    // similar once the execution is done, update the onging execution count and trigger executing the next callbacks
    if(this.ongoingExecution < this.allowedConcurrentTasks){
      this.ongoingExecution++;
      executor(task)
        .finally(() => {
          this.ongoingExecution--;
          executeNext();
        });
    }
    // if more than k callbacks are being executed, store them into the queue
    // store no more than queue limit items into the queue
    else{
      if(this.callbacksQueue.length < this.queueLimit){
      this.callbacksQueue.push(task);
    }
   }
  }
  
  const executeNext = () => {
    // if there are items in the callbacks queue and there is room for execution
    if(this.callbacksQueue.length > 0 && this.ongoingExecution < this.allowedConcurrentTasks){
      // get the next callback depending upon the order
      let nextCallback = this.order === 'LIFO' ? this.callbacksQueue.pop() : this.callbacksQueue.shift();
      
      // process the next callback
      this.process(nextCallback);
    }  
  };
}

const queue = new QueueCallbacks(
  'FIFO',
  1,
  8,
  defaultExecutor
);

queue.process(
  dummyApi(1, false, {
    onSuccess: (res, id) => console.log(id, res),
    onError: (err, id) => console.error(id, err.message)
  })
);

queue.process(
  dummyApi(2, true, {
    onSuccess: (res, id) => console.log(id, res),
    onError: (err, id) => console.error(id, err.message)
  })
);

queue.process(dummyApi(1));
queue.process(dummyApi(1));

// Output:
// "Starting task-1"
// "task-1" "Completed in 1s"
// "Finished task-1"
// "Starting task-2"
// "task-2" "Failed after 2s" // waits for this to complete before executing next
// "Finished task-2"
// "Starting task-3"
// "Finished task-3"
// "Starting task-4"
// "Finished task-4"