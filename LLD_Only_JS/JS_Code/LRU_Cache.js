class LRUCache{
    constructor(maxSize = 100){
        this.maxSize = maxSize;
        this.map = new Map();
    }
    put(key, value){
        if(this.map.has(key)){
            this.map.delete(key);
        }
        else if(this.map.size >= this.maxSize){
            const oldestKey = this.map.keys().next().value();
            this.map.delete(oldestKey);
        }
        this.map.set(key, value);
    }
    use(key){
        if(this.map.has(key)){
            const value = this.map.get(key);
            this.map.delete(key);
            this.map.set(key, value);
        }
    }

    get(key){
          if(this.map.has(key)){
           this.use(key)
           return this.map.get(key);
        }
        return null;
    }

    display(){
        console.log([...this.map.entries()].reverse());
    }
    clear(){
        this.map.clear();
    }
    delete(key){
        this.map.delete(key);
    }
}