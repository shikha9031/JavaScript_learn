class SDK{
    constructor(){
       this.queue = [];
       this.count = 1;
       this.idx = 0;
    }
    logEvent(event){
       this.queue.push(event);
    }

    wait(){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                if(this.count % 5 === 0){
                    reject(this.count);
                }
                else{
                    resolve(this.count);
                }
            }, 1000);
        })
    }
    sendAnalytics = async function(){
            if(this.queue.length === 0){
                return;
            }
            const current = this.queue.shift();
            try{
                await this.wait();
                this.log("Analytics sent event ", ++this.idx);
                this.count++;
            }
            catch(err){
                this.log("Failed to send event ", this.idx+1);
                this.log("Retrying sending event ", this.idx+1);
                this.count = 1;
                this.queue.unshift(current);
            }
            finally{
                this.sendAnalytics();
            }
    }
    send = async function(){
       this.sendAnalytics();
    }
    log(msg, event){
        console.log(msg, " ", event);
    }
}

let sdk = new SDK();
sdk.logEvent("event 1");
sdk.logEvent("event 2");
sdk.logEvent("event 3");
sdk.logEvent("event 4");
sdk.logEvent("event 5");
sdk.logEvent("event 6");
sdk.logEvent("event 7");
sdk.logEvent("event 8");
sdk.logEvent("event 9");
sdk.logEvent("event 10");

sdk.send();