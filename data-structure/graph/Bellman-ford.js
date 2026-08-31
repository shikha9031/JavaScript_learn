// it is similar like Dijkstra algorithm but in Dijkstra negative value is not handled or incase of negative cycle it will fail
// but negative value and negative cycle can be handled in Bellman ford algorithm

class Solution {
    bellmanFord(V, edges, src) {
        // code here
        let dis = new Array(V).fill(100000000);
        dis[src] = 0;
        
        for(let i = 0; i<V-1; i++){
            for(let [u, v, w] of edges){
                let newD = w + dis[u];
                if(dis[u] !== 100000000 && newD < dis[v]){
                    dis[v] = newD;
                }
            }
        }
        for(let [u, v, w] of edges){
            if(dis[u] !== 100000000 && dis[u]+w < dis[v]){
                return [-1];
            }   
         }
         return dis;
    }
}