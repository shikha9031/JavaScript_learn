const QueueCallbacks = function(order = 'FIFO'){
    this.order = order;
    this.callbackQueue = [];
    this.ongoingExecution = 0;

    this.process  = (callback) =>{
        if(this.ongoingExecution<2){
            this.ongoingExecution++;
            callback.then((item)=>{
                console.log(item);
            }).finally(()=>{
                this.ongoingExecution--;
                this.executeNext();
            })
        }
        else{
            if(this.callbackQueue.length<6){
                this.callbackQueue.push(callback);
            }
        }
    }
     this.executeNext = ()=>{
        if(this.callbackQueue.length > 0 && this.ongoingExecution<2){
            let nextCallback = this.order === 'LIFO'? this.callbackQueue.pop() : this.callbackQueue.shift();
            this.process(nextCallback);
        }
    }
}

let dummyApi = (idx) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(idx)
        }, idx * 1000);
    })
}
const asyncCallbacks = new QueueCallbacks('LIFO');
asyncCallbacks.process(dummyApi(1));
asyncCallbacks.process(dummyApi(2));
asyncCallbacks.process(dummyApi(6));
asyncCallbacks.process(dummyApi(4));
asyncCallbacks.process(dummyApi(5));
asyncCallbacks.process(dummyApi(6));
asyncCallbacks.process(dummyApi(7));
asyncCallbacks.process(dummyApi(8));
asyncCallbacks.process(dummyApi(9));
asyncCallbacks.process(dummyApi(10));

// Folow up

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

let taskCounter = 0;

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

