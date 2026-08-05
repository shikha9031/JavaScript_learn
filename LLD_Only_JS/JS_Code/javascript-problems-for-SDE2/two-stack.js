function twoStacks(size){
    this.size = size;
    this.stack = new Array(size);
    this.top1 = -1;
    this.top2 = this.size;
    this.push1 = function(val){
        if(this.top1<this.top2-1){
            this.stack[++this.top1] = val;
        }
        else{
            console.log('Stack Overflow');
            return false;
        }
    }
    this.push2 = function(val){
        if(this.top2-1>this.top1){
            this.stack[--this.top2] = val
        }
        else{
            console.log('Stack Overflow');
            return false;
        }
    }
    this.pop1 = function(){
        if(this.top1 >=0){
            let elem = this.stack[this.top1];
            this.top1--;
            return elem;
        }
        else{
            console.log('Stack Overflow');
            return false;
        }
    }
    this.pop2 = function(){
            if(this.top2<this.size){
                let elem = this.stack[this.top2];
                this.top2++;
                return elem;
            }
            else{
                console.log('Stack Overflow');
                return false;
            }
    }
}
let stack = new twoStacks(10);

//Push data in first stack
stack.push1('Prashant');

//Push data in second stack
stack.push2('Yadav');

//Pop data from first stack
console.log(stack.pop1());

//Pop data from second stack
console.log(stack.pop2());

// Output:
// "Prashant"
// "Yadav"