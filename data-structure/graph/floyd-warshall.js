function floydWarshall(dist) {
        // code here
        let n = dist.length;
        const INF = 100000000;
        
        for(let i = 0; i<n; i++){
           for(let j = 0; j<n; j++){
               if(i === j){
                   dist[i][j] = 0;
               }
           } 
        }
        
        for(let k = 0; k<n; k++){
            for(let i = 0; i<n; i++){
                for(let j = 0; j<n; j++){
                    if(dist[i][k] !== INF && dist[k][j] !== INF){
                        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j])
                    }
                }
            }
        }
        return dist;
    }