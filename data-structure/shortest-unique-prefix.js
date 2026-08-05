class TrieNode{
    constructor(){
        this.children = {};
        this.words = [];
        this.index = -1;
    }
}

class Trie{
    constructor(){
        this.root = new TrieNode();
    }
    insert(word, idx){
        let node = this.root;
        for(let ch of word){
            if(!node.children[ch]){
                node.children[ch] = new TrieNode();
            }
                node = node.children[ch];
                node.words.push(node);
                node.index = idx;
        }
    }
        getAllShortestPrefix(){
             let node = this.root;
             let result = [];
             
             function dfs(node, str = []){
                 for(let ch in node.children){
                     str.push(ch);
                     if(node.children[ch].words.length === 1){
                         let idx = node.children[ch].index;
                         result[idx] = str.join("");
                     }
                     else{
                         dfs(node.children[ch], str);
                     }
                      str.pop();
                 }
             }
             dfs(node, []);
             return result;
        }
}

class Solution {
    
    findPrefixes(arr) {
        // code here
        const trie = new Trie();
        arr.forEach((word, idx)=> trie.insert(word, idx));
        let result = trie.getAllShortestPrefix();
        return result;
    }
}