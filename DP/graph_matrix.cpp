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
