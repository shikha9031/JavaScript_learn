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


