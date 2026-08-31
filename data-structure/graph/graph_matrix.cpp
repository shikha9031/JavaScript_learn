#include <bits/stdc++.h>
using namespace std;

class graph{

    vector<vector<int>>adjMatrix;
    int numOfNodes;

    public : 

    graph(int n){
        numOfNodes = n;
        adjMatrix.resize(n, vector<int>(n, 0));
    }

    void addEdge(int node1, int node2){
        adjMatrix[node1][node2] = 1;
        adjMatrix[node2][node1] = 1;
    }

    void printAdjMatrix(){

        for(int i = 0; i<numOfNodes; i++){
            for(int j = 0; j<numOfNodes; j++){
                cout << adjMatrix[i][j] << " ";
            }
            cout << endl;
        }

    }

};


int main(){

    int nodes, edges;
    cin >> nodes >> edges;

    graph g(nodes);

    for(int i = 0; i<edges; i++){
        int node1 , node2;
        cin >> node1 >> node2;

        g.addEdge(node1, node2);
    }


    g.printAdjMatrix();


}

#include<bits/stdc++.h>
using namespace std;

class graph{

    int numOfNodes;
    map<int, vector<int>>adjList;

    public : 

    graph(int n){
        numOfNodes = n;
    }

    void addEdge(int node1, int node2){
        adjList[node1].push_back(node2);
        adjList[node2].push_back(node1);
    }


    void printAdjList(){
        for(auto pair : adjList){
            cout << pair.first << " -> ";
            for(auto nbr : pair.second){
                cout << nbr << " ";
            }
            cout << endl;
        }
    }

    


};




int main(){

    int nodes, edges;
    cin >> nodes >> edges;

    graph g(nodes);

    for(int i = 0; i<edges; i++){
        int node1, node2;
        cin >> node1 >> node2;

        g.addEdge(node1, node2);
    }

    g.printAdjList();



}


// Adj List
#include<bits/stdc++.h>
using namespace std;

class graph{

    map<int, vector<int>>adjList;
    int numOfNodes;

    public :

    graph(int n){
        numOfNodes = n;
    }

    void addEdge(int node1, int node2){
        adjList[node1].push_back(node2);
        adjList[node2].push_back(node1);
    }

    void DFShelper(int node, vector<bool>&vis){

        vis[node] = true;
        cout << node << " ";

        for(auto nbr : adjList[node]){
            if(vis[nbr] == false){
                DFShelper(nbr, vis);
            }
        }

    }


    void DFS(){

        vector<bool>vis(numOfNodes, false);
        DFShelper(0, vis);

    }
};


int main(){

    int nodes, edges;
    cin >> nodes >> edges;

    graph g(nodes);

    for(int i = 0; i<edges; i++){
        int node1, node2;
        cin >> node1 >> node2;

        g.addEdge(node1, node2);
    }

    g.DFS();


}
// BFS

#include<bits/stdc++.h>
using namespace std;

class graph{

    map<int, vector<int>>adjList;
    int numOfNodes;

    public :

    graph(int n){
        numOfNodes = n;
    }

    void addEdge(int node1, int node2){
        adjList[node1].push_back(node2);
        adjList[node2].push_back(node1);
    }

    void BFS(){

        queue<int>q;
        vector<bool>vis(numOfNodes, false);

        q.push(0);
        vis[0] = true;

        while(q.size() != 0){

            int node = q.front();
            q.pop();

            cout << node << " ";

            for(auto nbr : adjList[node]){
                if(vis[nbr] == false){
                    vis[nbr] = true;
                    q.push(nbr);
                }
            }

        }



    }




};




int main(){

    int nodes, edges;
    cin >> nodes >> edges;

    graph g(nodes);

    for(int i = 0; i<edges; i++){
        int node1, node2;
        cin >> node1 >> node2;

        g.addEdge(node1, node2);

    }


    g.BFS();


}
// number of Islands

class Solution {
public:


    void dfs(int i, int j, int n, int m, vector<vector<char>>&grid, vector<vector<int>>&vis){

        vis[i][j] = 1;


        int X[4] = {-1, 0, 0, 1}; //ROW 
        int Y[4] = {0, -1, 1, 0}; //COL
        // UP, LEFT, RIGHT, DOWN

        for(int k = 0; k<4; k++){
            int newX = i + X[k];
            int newY = j + Y[k];

            // newX < no of rows 
            // newX >= 0

            // newY < no of cols
            // newY >= 0

            // when you are seeing a piece of land
            // it should be unvisited

            if(newX >= 0 and newX < n and newY >= 0 and newY < m and grid[newX][newY] == '1' and vis[newX][newY] == 0){
                dfs(newX, newY, n, m, grid, vis);
            }

        }


    }





    int numIslands(vector<vector<char>>& grid) {
        
              int n = grid.size();
              int m = grid[0].size();

              vector<vector<int>>vis(n, vector<int>(m ,0));

              int islands = 0;

              for(int i = 0; i<n; i++){
                for(int j = 0; j<m; j++){

                    // it should be piece of land 
                    // it should be unvisited

                    if(grid[i][j] == '1' and vis[i][j] == 0){
                        islands++;
                        dfs(i, j, n, m, grid, vis);
                    }

                }
              }

              return islands;


    }
};

//weighted adjacency list
#include<bits/stdc++.h>
using namespace std;


class graph{

    map<int, vector<pair <int, int>> >adjList;
    int numOfNodes;

    public : 

    graph(int n){
        numOfNodes = n;
    }

    void addEdge(int node1, int node2, int wt){
        adjList[node1].push_back({node2, wt});
        adjList[node2].push_back({node1, wt});
    }

    void printGraph(){

        for(auto pair : adjList){
            int node = pair.first;

            cout << node << " -> " ;

            for(auto nbr : pair.second){
                int neighbor = nbr.first;
                int wt = nbr.second;

                cout << neighbor << "," << wt << "  ";
            }
            cout << endl;
        }

    }


};

int main(){

    int nodes, edges;
    cin >> nodes >> edges;

    graph g(nodes);

    for(int i = 0; i < edges; i++){
        int node1, node2, wt;
        cin >> node1 >> node2 >> wt;

        g.addEdge(node1, node2, wt);
    }

    g.printGraph();



}