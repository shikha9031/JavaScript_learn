class SDK {
  constructor(){
    // hold the events
    this.queue = [];

    // track the count
    this.count = 1;
  }

  // push event in the queue
  logEvent(ev) {
    this.queue.push(ev);
  }

  // function to delay the exection
  wait = () => new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject every n % 5 time
      if(this.count % 5 === 0){
        reject();
      } else {
        resolve();
      }
    }, 1000);
  });

  // to send analytics
  // recursively send the events
  sendAnalytics = async function (){
    // if there are no events in the queue
    // stop execution
    if(this.queue.length === 0){
      return;
    }

    // get the first element from the queue
    const current = this.queue.shift();

    try {
      // delay
      await this.wait();

      // print the event
      // can perform any other operations as well like making api call
      console.log("Analytics sent " + current);

      // increase the count
      this.count++;
    } catch(e){

      // if exection fails
      console.log("-----------------------");
      console.log("Failed to send " + current);
      console.log("Retrying sending " + current);
      console.log("-----------------------");

      // reset the count
      this.count = 1;

      // push the event back into the queue
      this.queue.unshift(current);
    }finally{

      // recursively call the same function
      // to send the remaining
      this.sendAnalytics();
    }	
  }

  // start the execution
  send = async function(){
    this.sendAnalytics();
  }
}
