class stackWithMinMax{
    constructor(){
        this.stack = [];
        this.length = 0;
    }
    push(val){
        if(this.length === 0){
            this.stack[this.length++] = {current: val, min: val, max:val}
        }
        else{
            const data = this.peek();
            let {max, min} = data;
            max = max > val ? max : val;
            min = min < val ? min : val;
            this.stack[this.length++] = {current: val, min, max}
        }
    }
    peek(){
        return this.stack[this.length-1];
    }
    pop(){
        --this.length;
        return this.stack.pop();
    }
    max(){
        return this.stack[this.length-1].max;
    }
    min(){
        return this.stack[this.length-1].min;
    }
}


//Input:
let SM = new stackWithMinMax();
SM.push(4);
SM.push(7);
SM.push(11);
SM.push(23);
SM.push(77);
SM.push(3);
SM.push(1);
SM.pop();
console.log(`max: ${SM.max()}`, `min: ${SM.min()}`);

// Output:
// "max: 77" "min: 3"