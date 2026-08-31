class UnionFind {
    constructor(size) {
    
        // Initialize the parent array with each 
        // element as its own representative
        this.parent = Array.from({ length: size }, (_, i) => i);
    }

    find(i) {
    
        // If i itself is root or representative
        if (this.parent[i] === i) {
            return i;
        }
        
        // Else recursively find the representative 
        // of the parent
        return this.find(this.parent[i]);
    }

    unite(i, j) {
    
        // Representative of set containing i
        const irep = this.find(i);
        
        // Representative of set containing j
        const jrep = this.find(j);
        
        // Make the representative of i's set
        // be the representative of j's set
        this.parent[irep] = jrep;
    }
}

// Example usage
const size = 5;
const uf = new UnionFind(size);

// Unite sets containing 1 and 2, and 3 and 4
uf.unite(1, 2);
uf.unite(3, 4);

// Check if 1 and 2 are in the same set
const inSameSet = uf.find(1) === uf.find(2);
console.log("Are 1 and 2 in the same set?", 
                  inSameSet ? "Yes" : "No");