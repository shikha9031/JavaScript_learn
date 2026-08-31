class Solution {
    spanningTree(V, edges) {
        // code here
        let isMST = new Array(V).fill(false);
        let minHeapObj = new CustomMinHeap();
        
        minHeapObj.push([0,0]);
        
        let sum = 0 ;
        
        let adjList = new Map();
        for(let i = 0; i<V; i++){
            adjList.set(i, []);
        }
        
        for(let edge of edges){
            let node = edge[0];
            let neighbor = edge[1];
            let weight = edge[2];
            
            adjList.get(node).push([neighbor, weight]);
            adjList.get(neighbor).push([node, weight]);
        }
        
        while(!minHeapObj.isEmpty()){
            let top = minHeapObj.pop();
            let weight = top[0];
            let node = top[1];
            if(isMST[node]){
                continue;
            }
            sum += weight;
            isMST[node] = true;
            for(let edge of adjList.get(node)){
                let neighbor = edge[0];
                let neighbor_wt = edge[1];
                if(!isMST[neighbor]){
                    minHeapObj.push([neighbor_wt, neighbor]);
                }
            }
        }
        return sum;
    }
}

class CustomMinHeap{
    constructor(){
        this.heap = [];
        this.compare = (a,b)=> a[0]<=b[0];
    }
    size(){
       return this.heap.length;
    }
    isEmpty(){
         return this.heap.length == 0;
    }
    push(val){
        this.heap.push(val);
        this.bubbleUp(this.heap.length-1);
    }
    pop(){
        if(this.heap.length === 0){
            return null;
        }
        if(this.heap.length === 1){
            return this.heap.pop();
        }
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return top;
    }
    bubbleUp(idx){
        while(idx > 0){
            let parent = Math.floor((idx-1)/2);
            if(this.compare(this.heap[parent], this.heap[idx])){
                break;
            }
            const temp = this.heap[idx];
            this.heap[idx] = this.heap[parent];
            this.heap[parent] = temp;
            idx = parent;
        }
    }
    bubbleDown(idx){
        while(true){
            let left = idx * 2 + 1;
            let right = idx * 2 + 2;
            let best = idx;
            if(left<this.size() && this.compare(this.heap[left], this.heap[best])){
                best = left;
            }
            if(right<this.size() && this.compare(this.heap[right], this.heap[best])){
                best = right;
            }
            if(best === idx){
                break;
            }
            const temp = this.heap[idx];
            this.heap[idx] = this.heap[best];
            this.heap[best] = temp;
            idx = best;
        }
    }
}
