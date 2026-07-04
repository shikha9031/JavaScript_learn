class Observable{
    constructor(){
        this.observer = [];
    }
    subscribe(callback){
        if(typeof callback !== 'function'){
            throw new Error('Callback must be a function');
        }
        this.observer.push(callback);
        return {
            unsubscribe:()=>{
                this.observer = this.observer.filter(item=> item !== callback);
            }
        }
    }
    notify(...args){
        this.observer.forEach((event)=>{
            try{
                 event.apply(this, args);
            }
           catch(error){
            console.error('Error in observer callback:', error);
           }
        })
    }
    hasObservers(){
        return this.observer.length > 0;
    }
    getObserverCount(){
        return this.observer.length;
    }
    clear(){
        this.observer = [];
    }
}
const observable = new Observable();

// Multiple subscribers
const sub1 = observable.subscribe(function(data) { 
  console.log('Sub1:', data); 
});

const sub2 = observable.subscribe(function(data) { 
  console.log('Sub2:', data); 
});

const sub3 = observable.subscribe(function(data) { 
  console.log('Sub3:', data); 
});

console.log('Observer count:', observable.getObserverCount()); // 3

observable.notify('Broadcast message');
// Logs:
// Sub1: Broadcast message
// Sub2: Broadcast message
// Sub3: Broadcast message

// Unsubscribe one
sub2.unsubscribe();

observable.notify('Another message');
// Logs:
// Sub1: Another message
// Sub3: Another message

// Clear all observers
observable.clear();
observable.notify('No one listening'); // Nothing logged