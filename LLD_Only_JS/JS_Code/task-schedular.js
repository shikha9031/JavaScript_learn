class TaskScheduler {
    constructor(concurrency) {
        this.concurrency = Number(concurrency);
        this.runningTasks = 0;
        this.__waitingQueue = [];
    }
    getNextTask(){
        if(this.runningTasks < this.concurrency && this.__waitingQueue.length > 0){
            let nextTask = this.__waitingQueue.shift();
            this.nextTask();
        }
    }
    addTask(task) {
        return new Promise((resolve, reject)=> {
            async function __taskRunner() {
                this.runningTasks += 1;
                try{
                    const result = await task;
                    console.log("Result ", result);
                    resolve(result);
                }
                catch(err){
                    console.log("Task Failed ", err);
                    reject(err);
                }
                finally{
                    this.runningTasks -= 1;
                    this.getNextTask();
                }
            }
            if(this.runningTasks < this.concurrency){
                __taskRunner.call(this);
            }
            else {
                this.__waitingQueue.push(__taskRunner.bind(this));
            }
        })
    }


}

function saveToDB(message) {
    return new Promise((req, res) => {
        setTimeout(() => {
            console.log(`Message ${message} saved to DB`);
            res();
        }, 2 * 1000);
    })
}

function chat() {
    let message = Array(100).fill(null);
    message.forEach((_,index)=>{
        const message = `Message: ${index}`;
        scheduler.addTask();
    })
}


const schedular = new TaskSchedular(2);
schedular.addTask(()=> new Promise((resolve, reject) => setTimeout(()=> console.log('Task 1'), 1000)));
schedular.addTask(()=> new Promise((resolve, reject) => setTimeout(()=> console.log('Task 2'), 500)));
schedular.addTask(()=> new Promise((resolve, reject) => setTimeout(()=> console.log('Task 3'), 300)));
schedular.addTask(()=> new Promise((resolve, reject) => setTimeout(()=> console.log('Task 4'), 400)));