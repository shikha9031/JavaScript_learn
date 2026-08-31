class Solution {
    spanningTree(V, edges) {
       let arr = [...edges];
       arr.sort((a,b)=> a[2] - b[2]);
       return this.krushkal(arr, V);
    }
    
    krushkal(arr, V){
        let sum = 0;
        let unionFindObj = new UnionFind(V);
        for(let temp of arr){
            let u = temp[0];
            let v = temp[1];
            let wt = temp[2];
            
            let parent_U = unionFindObj.find(u);
            let parent_V = unionFindObj.find(v);
            if(parent_U !== parent_V){
                unionFindObj.unionSets(u, v);
                sum += wt;
            }
        }
        return sum;
    }
}

class UnionFind{
    constructor(n){
        this.rank = new Array(n).fill(0);
        this.par = Array.from({length: n}, (_, i) => i);
    }
    
    find(i){
        if(this.par[i] !== i){
            this.par[i] = this.find(this.par[i]);
        }
        return this.par[i];
    }
    unionSets(i, j){
        const xRoot = this.find(i);
        const yRoot = this.find(j);
        if(xRoot === yRoot){
            return;
        }
        if(this.rank[xRoot] < this.rank[yRoot]){
            this.par[xRoot] = yRoot;
        }
        else if(this.rank[yRoot] < this.rank[xRoot]){
            this.par[yRoot] = xRoot;
        }
        else{
            this.par[yRoot] = xRoot;
            this.rank[xRoot]++;
        }
    }
}