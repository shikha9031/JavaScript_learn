//it helps on detecting cycle and merging the nodes dynamically
//"cycle detection + Kruskal + connected components" as DSU patterns.
class DisjoinUnionSets{
    constructor(n){
        this.rank = new Array(n).fill(0);
        this.parent = Array.from({length: n}, (_, i)=> i);
        this.size = new Array(n).fill(1);
    }
    find(i){//Which group/component does x belong to?
        let root = this.parent[i];
        if(this.parent[root] !== root){
            this.parent[i] = this.find(root);
        }
        return this.parent[i];
    }
    unionByRank(x, y){ //  Merge the groups containing x and y based on rank
        const xRoot = this.find(x);
        const yRoot = this.find(y);
        if(xRoot === yRoot){
            return;
        }
        if(this.rank[xRoot]<this.rank[yRoot]){
            this.parent[xRoot] = yRoot;      
        }
        else if(this.rank[yRoot] < this.rank[xRoot]){
            this.parent[yRoot] = xRoot;
        }
        else{
            this.parent[yRoot] = xRoot;
            this.rank[xRoot]++;
        }
    }
    unionBySize(x, y){// Merge the groups containing x and y based on size
        let XParent = this.find(x);
        let YParent = this.find(y);
        if(XParent === YParent){
            return false;
        }
        if(this.size[XParent]<this.size[YParent]){
            this.parent[XParent] = YParent;
            this.size[YParent] += this.size[XParent];
        }
        else {
            this.parent[YParent] = XParent;
            this.size[XParent] += this.size[YParent];
        }
        return true;
    }

}

const n = 5;  // Let there be 5 persons with ids 0, 1, 2, 3, and 4
const dus = new DisjointUnionSets(n);

// 0 is a friend of 2
 dus.unionByRank(0, 2);
// 4 is a friend of 2
 dus.unionByRank(4, 2);
// 3 is a friend of 1
 dus.unionByRank(3, 1);

// Check if 4 is a friend of 0
if (dus.find(4) === dus.find(0))
    console.log('Yes');
else
    console.log('No');

// Check if 1 is a friend of 0
if (dus.find(1) === dus.find(0))
    console.log('Yes');
else
    console.log('No');