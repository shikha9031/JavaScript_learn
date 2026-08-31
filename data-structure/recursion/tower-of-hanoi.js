class Solution {
    towerOfHanoi(n, from, to, aux) {
        // code here
        
        if(n === 1){
            return 1;
        }
        console.log(" from ", from, " to ", to, " aux ", aux);
        let count = this.towerOfHanoi(n-1, from, aux, to) || 0;
        
        count++;
        count += this.towerOfHanoi(n-1, aux, to, from);
        return count;
    }
}