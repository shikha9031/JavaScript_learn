const INF = Number.MAX_SAFE_INTEGER;

function floydWarshall(graph, n) {

    // Try every node as an intermediate node
    for (let k = 0; k < n; k++) {

        // Source
        for (let i = 0; i < n; i++) {

            // Destination
            for (let j = 0; j < n; j++) {

                if (graph[i][k] !== INF && graph[k][j] !== INF) {
                    graph[i][j] = Math.min(
                        graph[i][j],
                        graph[i][k] + graph[k][j]
                    );
                }
            }
        }
    }
}

// Example Usage
const nodes = 4;

// Initialize adjacency matrix
const graph = Array.from({ length: nodes }, () =>
    Array(nodes).fill(INF)
);

// Distance from a node to itself is 0
for (let i = 0; i < nodes; i++) {
    graph[i][i] = 0;
}

// Add directed edges
graph[0][1] = 5;
graph[0][3] = 10;
graph[1][2] = 3;
graph[2][3] = 1;

floydWarshall(graph, nodes);

// Print shortest distance matrix
for (let i = 0; i < nodes; i++) {
    let row = "";
    for (let j = 0; j < nodes; j++) {
        row += graph[i][j] === INF ? "INF " : graph[i][j] + " ";
    }
    console.log(row);
}