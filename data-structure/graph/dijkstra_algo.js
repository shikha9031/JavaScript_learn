var networkDelayTime = function(times, n, k) {
    let adjList = new Map();

    for (let i = 1; i <= n; i++) {
        adjList.set(i, []);
    }

    for (let [u, v, w] of times) {
        adjList.get(u).push([v, w]);
    }

    let dist = new Array(n + 1).fill(Infinity);
    dist[k] = 0;

    let heap = new MinHeap();
    heap.push([0, k]); // [time, node]

    while (!heap.isEmpty()) {
        let [time, node] = heap.pop();

        if (time > dist[node]) continue;

        for (let [next, weight] of adjList.get(node)) {
            let newTime = time + weight;

            if (newTime < dist[next]) {
                dist[next] = newTime;
                heap.push([newTime, next]);
            }
        }
    }

    let ans = 0;

    for (let i = 1; i <= n; i++) {
        if (dist[i] === Infinity) return -1;
        ans = Math.max(ans, dist[i]);
    }

    return ans;
};

class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(val) {
        this.heap.push(val);
        this.bubbleUp();
    }

    pop() {
        if (this.heap.length === 1) return this.heap.pop();

        let top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return top;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    bubbleUp() {
        let i = this.heap.length - 1;

        while (i > 0) {
            let p = Math.floor((i - 1) / 2);

            if (this.heap[p][0] <= this.heap[i][0]) break;

            [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
            i = p;
        }
    }

    bubbleDown() {
        let i = 0;

        while (true) {
            let left = 2 * i + 1;
            let right = 2 * i + 2;
            let smallest = i;

            if (left < this.heap.length && this.heap[left][0] < this.heap[smallest][0]) {
                smallest = left;
            }

            if (right < this.heap.length && this.heap[right][0] < this.heap[smallest][0]) {
                smallest = right;
            }

            if (smallest === i) break;

            [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
            i = smallest;
        }
    }
}