// Kahn's Algorithm

/**
 * @param {number} V
 * @param {number[][]} edges
 * @returns {number[]}
 */

class Solution {
    topoSort(V, edges) {
        // code here
        let indegree = new Array(V).fill(0);
        let adjList = new Map();
        
       for(let i = 0; i<V; i++){
           adjList.set(i, []);
       }
       
       for(let [u,v] of edges){
           adjList.get(u).push(v);
           indegree[v]++;
       }
        
        let queue = [];
        for(let i = 0; i<indegree.length; i++){
            if(indegree[i] === 0){
                queue.push(i);
            }
        }
        
        //BFS
        let result = [];
        while(queue.length>0){
            let top = queue.shift();
            result.push(top);
            let edge = adjList.get(top);
            for(let v of edge){
                indegree[v]--;
                if(indegree[v] === 0){
                    queue.push(v);
                }
            }
        }
        return result;
    }
}