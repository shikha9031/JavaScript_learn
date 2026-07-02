class Heap {
    constructor(compare) {
        this.heap = [];
        this.compare = compare;
    }

    size() {
        return this.heap.length;
    }

    peek() {
        return this.heap[0];
    }

    push(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 1) return this.heap.pop();

        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);

        return top;
    }

    bubbleUp(i) {
        while (i > 0) {
            let p = Math.floor((i - 1) / 2);

            if (this.compare(this.heap[p], this.heap[i])) break;

            [this.heap[p], this.heap[i]] =
                [this.heap[i], this.heap[p]];

            i = p;
        }
    }

    bubbleDown(i) {
        const n = this.heap.length;

        while (true) {
            let best = i;
            let left = 2 * i + 1;
            let right = 2 * i + 2;

            if (
                left < n &&
                !this.compare(this.heap[best], this.heap[left])
            )
                best = left;

            if (
                right < n &&
                !this.compare(this.heap[best], this.heap[right])
            )
                best = right;

            if (best === i) break;

            [this.heap[i], this.heap[best]] =
                [this.heap[best], this.heap[i]];

            i = best;
        }
    }
}

function dijkstra(graph, source) {

    const n = graph.length;

    const dist = new Array(n).fill(Infinity);

    dist[source] = 0;

    const minHeap = new Heap(
        (a, b) => a.distance <= b.distance
    );

    minHeap.push({
        node: source,
        distance: 0
    });

    while (minHeap.size()) {

        const { node, distance } = minHeap.pop();

        // Ignore stale entries
        if (distance > dist[node]) continue;

        for (const [next, weight] of graph[node]) {

            const newDistance = distance + weight;

            if (newDistance < dist[next]) {

                dist[next] = newDistance;

                minHeap.push({
                    node: next,
                    distance: newDistance
                });
            }
        }
    }

    return dist;
}