class Graph {
    constructor(){
        this.nodes = Number(prompt("Enter number Of nodes"));
        this.edges = Number(prompt("Enter number of edges"));
        this.numberOfNodes = this.nodes;
        this.adjMatrix = Array.from({length: this.numberOfNodes}, ()=> Array(this.numberOfNodes).fill(0));
        console.log(this.adjMatrix);
    }
    addEdge(node1, node2){
        this.adjMatrix[node1][node2] = 1;
        this.adjMatrix[node2][node1] = 1;
    }
    printAdjMatrix(){
            console.log(this.adjMatrix);
    }

}
let graph = new Graph();
let adjMatrix = graph.adjMatrix;
for(let i = 0; i<graph.edges; i++){
    const node = prompt("enter nodes value with comma seperated").split(",");
    
    const node1 = node[0];
    const node2 = node[1];
    graph.addEdge(node1, node2);
}
// graph.addEdge(0,1);
// graph.addEdge(0,2);
// graph.addEdge(0,3);
// graph.addEdge(1,2);
// graph.addEdge(2,3);
// graph.addEdge(3,4);
// graph.addEdge(5,1);
graph.printAdjMatrix();


// Adj List
class Graph{
    constructor(){
        this.nodes = Number(prompt("Enter number of nodes: "));
        this.edges = Number(prompt("enter number of edges: "));
        this.map = new Map();
    }
    addEdge(node1, node2){
        if(!this.map.has(node1)){
            this.map.set(node1, []);
        }
        this.map.get(node1).push(node2);
        if(!this.map.has(node2)){
            this.map.set(node2, []);
        }
        this.map.get(node2).push(node1);
    }
    printNodes(){
        for(let [key, value] of this.map){
            console.log(key, " ", value);
        }
    }
    dfs(){
        let visited = new Array(this.numberOfNodes).fill(false);
       
        const helper = (node, visited)=>{
            console.log(node);
            visited[node] = true;
            
            for(let nbs of this.map.get(node)){
                if(!visited[nbs]){
                    helper(nbs, visited);
                }
            }
        }
         helper(0, visited);
    }
    bfs(){
      let queue = [0];
      let visited = new Array(this.numberOfNodes).fill(false);
      visited[0] = true;
      while(queue.length > 0){
          let front = queue.shift();
          console.log(front);
          for(let nbr of this.map.get(front)){
              if(visited[nbr] === false){
                  visited[nbr] = true;
                  queue.push(nbr);
              }
          }
      }
  }
}
let graph = new Graph();
for(let i = 0; i<graph.edges; i++){
    let nodes = prompt("Enter nodes with comma seprated: ").split(",");
    let node1 = Number(nodes[0]);
    let node2 = Number(nodes[1].trim());
    graph.addEdge(node1, node2);
}
graph.printNodes();

// graph.addEdge(0,1);
// graph.addEdge(0,2);
// graph.addEdge(0,3);
// graph.addEdge(1,2);
// graph.addEdge(2,3);
// graph.addEdge(3,4);
// graph.addEdge(5,1);

//Weighted AdjList

class Graph{
    constructor(){
        this.adjList = {};
        this.nodes = Number(prompt("Enter number of nodes"));
        this.edges = Number(prompt("Enter number of edges"));
        this.numberOfNodes = this.nodes;
    }
    addEdge(node1, node2, wt){
        if(!this.adjList[node1]){
            this.adjList[node1] = [];
        }
        if(!this.adjList[node2]){
            this.adjList[node2] = [];
        }
        this.adjList[node1].push([node2, wt]);
        this.adjList[node2].push([node1, wt]);
    }
    printGraph(){
        for(let [key, value] of Object.entries(this.adjList)){
            console.log(key, " ", value);
        }
    }
}
const graph = new Graph();
for(let i = 0; i<graph.edges; i++){
const node = prompt("Enter node1, node2 and weigth with comma separted");
let nodesVal = node.split(",");
let node1 = nodesVal[0];
let node2 = nodesVal[1];
let weight = nodesVal[2];
graph.addEdge(node1, node2, weight);
}

graph.printGraph();

// Enter number of nodes5
// Enter number of edges6
// Enter node1, node2 and weigth with comma separted0,1,2
// Enter node1, node2 and weigth with comma separted0,3,56
// Enter node1, node2 and weigth with comma separted1,2,24
// Enter node1, node2 and weigth with comma separted2,3,56
// Enter node1, node2 and weigth with comma separted3,4,67
// Enter node1, node2 and weigth with comma separted5,6,24

// Number Of Islands

var numIslands = function(grid) {
    let count = 0;
    let visited = Array.from({length: grid.length}, ()=> new Array(grid[0].length).fill(false));

    for(let i = 0; i<grid.length; i++){
        for(let j = 0; j<grid[i].length; j++){
            if(grid[i][j] === '1' && visited[i][j] === false){
                count++;
                bfs(i, j, grid, visited);
            }
        }
    }
    return count;
};

function bfs(row, col, grid, visited) {
    visited[row][col] = true;
    let queue = [[row, col]];
    while(queue.length> 0){
        const front = queue.shift();
        let direction = [[0,1], [0,-1], [1,0], [-1,0]];
        for(let dir of direction){
            let newRow = front[0] + dir[0];
            let newCol = front[1] + dir[1];
            if(isSafe(newRow, newCol, grid.length, grid[0].length) && !visited[newRow][newCol] && grid[newRow][newCol] === "1"){
                visited[newRow][newCol] = true;
                queue.push([newRow, newCol]);
            }
        }
    }
}

function dfs(row, col, grid, visited){
    visited[row][col] = true;
    let direction = [[0,1], [0,-1], [1,0], [-1,0]];
    for(let dir of direction){
        let newRow = row + dir[0];
        let newCol = col + dir[1];
        if(isSafe(newRow, newCol, grid.length, grid[0].length) && !visited[newRow][newCol] && grid[newRow][newCol] === '1'){
            dfs(newRow, newCol, grid, visited)
        }
    }
}

function isSafe(row, col, rowLength, colLength){
    return (row >=0 && row<rowLength) && (col >=0 && col<colLength);
}