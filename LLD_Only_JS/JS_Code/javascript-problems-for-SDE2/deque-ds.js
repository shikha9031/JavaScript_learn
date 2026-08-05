function Deque2(){
     this.count = 0;
     this.lowestCount = 0;
     this.items = {};

    this.insertFront = (elem) => {
        if(this.isEmpty()){
            this.insertBack(elem);
        }
        else if(this.lowestCount > 0){
            this.items[--this.lowestCount] = elem;
        }
        else {
            for(let i = this.count; i>0; i--){
                this.items[i] = this.items[i-1];
            }
            this.count++;
            this.items[0] = elem;
        }
    }
    this.insertBack = (elem) => {
        this.items[this.count++] = elem;
    }
    this.removeFront = () => {
        if(this.isEmpty()){
            return null;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }
    this.removeBack = () => {
        if(this.isEmpty()){
            return null;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    this.getFront = () => {
         if(this.isEmpty()){
            return null;
        }
        return this.items[this.lowestCount];
    }
    this.getBack = () => {
        if(this.isEmpty()){
            return null;
        }
        return this.items[this.count - 1];
    }
    this.isEmpty = () => {
        return this.size() === 0;
    }
    this.size = () => {
        return this.count - this.lowestCount;
    }
    this.clear = () => {
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
    }
    this.toString = () => {
        if(this.isEmpty()){
            return '';
        }
        let objString = `${items[this.lowestCount]}`;
        for(let i = this.lowestCount + 1; i < this.count; i++){
            objString = `${objString},${items[i]}`;
        }
        return objString;
    }
}
let deque = new Deque2();
deque.insertBack(5);
deque.insertBack(10);
console.log(deque.getBack());
deque.removeBack();
console.log(deque.getBack());
deque.insertFront(15);
console.log(deque.getFront());
deque.removeFront(); 
console.log(deque.getFront());