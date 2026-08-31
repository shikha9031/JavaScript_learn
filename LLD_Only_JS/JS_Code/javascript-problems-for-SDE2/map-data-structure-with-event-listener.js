class StoreData{
    constructor(){
        this.map = new Map();
        this.eventListener = new Map();
    }
    add(key, name){
        const value = this.map.get(key) || '';
        this.map.set(key, name);
        this.execute(key, value)
    }
    execute(key, oldVal){
        if(!this.eventListener.has(key)){
            return;
        }
       const callbacks = this.eventListener.get(key);
       let newVal = this.map.get(key);
       callbacks.forEach((cb)=>{
         cb.apply(this, [oldVal, newVal, key]);
       })
       
    }
    on(changeKey, cb){
        let key = changeKey.split(":").pop();
        if(!this.eventListener.has(key)){
            this.eventListener.set(key, []);
        }
        this.eventListener.get(key).push(cb);
    }
    has(key){
        return this.map.has(key);
    }
}


let store = new StoreData();
store.add('name', 'joe');
store.add('age', 30);

console.log(store.has('age'));    // return true
console.log(store.has('animal')); // return false

store.add('name', 'emma');
store.on('change:name', (old_val, new_val, key)=>{console.log(`old ${key}: ${old_val}, new ${key}: ${new_val}`)});
store.add('name', 'john');
// "old name: emma, new name: john"

store.on('age', (old_val, new_val, key)=>{console.log(`old ${key}: ${old_val}, new ${key}: ${new_val}`)});
store.add('age', 50);
// "old age: 30, new age: 50"

store.on('change:age', (old_val, new_val, key)=>{console.log(`${old_val > new_val ? 'older now' : ''}`)});
store.add('age', 28);
// "older now"
// "old age: 50, new age: 28"

store.add('age', 45);
// ""
// "old age: 28, new age: 45"