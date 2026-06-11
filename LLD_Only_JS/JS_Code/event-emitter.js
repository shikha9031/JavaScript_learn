class MyEventEmitter {

    constructor(){
        this.__event_listener = {};
    }

    on(event, listener){
        if(!this.__event_listener[event]){
            this.__event_listener[event] = [];
        }
        this.__event_listener[event].push(listener);
        return true;
    }
    emit(event, ...args){
        if(!this.__event_listener[event]){
            return false;
        }
        const listeners = this.__event_listener[event];
        listeners.forEach((listener)=> listener(...args));
    }
    off(event, listener){
        if(!this.__event_listener[event]){
            return false;
        }
        const idx = this.__event_listener[event].indexOf(listener);
        if(idx < 0){
            return false;
        }
        this.__event_listener[event].splice(idx);
        return true;
    }
    once(event, listener) {
        const wrapperFunc = (...args)=>{
            listener(...args);
            this.off(event, wrapperFunc);
        }
        this.on(event, wrapperFunc);
        return true;
    }
}

const emitter = new EventEmitter();
const sendWhatsapp = (username) => console.log(`Whatsup to ${username}`);
emitter.on('user:signup', (username)=> console.log(`User Signup`));
emitter.on('user:signup', (username)=> console.log(`Sending Email to ${username}`));
emitter.once('user:signup', sendWhatsapp);


emitter.emit('user:signup', '@piyushGarg');
emitter.emit('user:signup', '@piyushGarg-1');
emitter.emit('user:signup', '@piyushGarg-2');
emitter.emit('user:signup', '@piyushGarg');
