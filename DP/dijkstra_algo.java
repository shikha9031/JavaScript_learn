class Solution {
    
    public int[] dijkstra(int V, int[][] edges, int src) {
        // code here
        Graph gh = new Graph(V);
        for(int i = 0; i<edges.length; i++){
            int node1 = edges[i][0];
            int node2 = edges[i][1];
            int weight = edges[i][2];
            gh.addEdge(node1, node2, weight);
        }
        int[] result = gh.dijkstra(src);
        return result;
    }
}

class Graph{
    static class Pair{
        int node;
        int weight;
        
        Pair(int node, int weight){
            this.node = node;
            this.weight = weight;
        }
        
    }
    private Map<Integer, List<Pair>> adjList;
    private int numOfNodes;
    
    public Graph(int n){
        numOfNodes = n;
        adjList = new HashMap<>();
    }
    
    public void addEdge(int node1, int node2, int weight){
        adjList.computeIfAbsent(node1, k-> new ArrayList<>()).add(new Pair(node2, weight));
        adjList.computeIfAbsent(node2, k-> new ArrayList<>()).add(new Pair(node1, weight));
    }
    public int[] dijkstra(int src){
        PriorityQueue<int []> pq = new PriorityQueue<>((a,b)-> Integer.compare(a[0], b[0]));
        int[] dist = new int[numOfNodes];
        Arrays.fill(dist, Integer.MAX_VALUE);
        int source = src;
        dist[source] = 0;
        pq.offer(new int[]{0, source});
        int[] result = new int[numOfNodes];
        while(!pq.isEmpty()){
            int[] curr = pq.poll();
            int currDist = curr[0];
            int node = curr[1];
            //skip outdated entries
            if(currDist > dist[node]){
                continue;
            }
            List<Pair> neighbors = adjList.getOrDefault(node, new ArrayList<>());
            for(Pair nbr : neighbors){
                int v = nbr.node;
                int weight = nbr.weight;
                if( dist[v] > dist[node] + weight){
                    dist[v] = dist[node] + weight;
                    pq.offer(new int[]{dist[v], v});
                }
            }
        }
       
        return dist;
    }
}


public class Main {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int V = sc.nextInt();
        int E = sc.nextInt();
        int[][] edges = new int[E][3];
        for(int i = 0 i<E; i++){
            int u = sc.nextInt();
            int v = sc.nextInt();
            int wt = sc.nextInt();

            edges[i] = new int[]{u, v, wt};
        }
        Solution s = new Solution(V, edges, 2);

        sc.close();
    }
}


// V = 3, edges[][] = [[0, 1, 1], [1, 2, 3], [0, 2, 6]], src = 2