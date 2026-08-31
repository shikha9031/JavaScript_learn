class Solution {
    findPrefixes(arr) {
        // code here
        const trie = new Trie();
        arr.forEach((word, idx) => trie.insert(word, idx));
        let result = [];
        
        for(let i = 0; i<arr.length; i++){
            result[i] = trie.getAllShortestPrefix(arr[i]);
        }
        return result;
    }
}

class TrieNode{
    constructor(){
        this.children = {};
        this.count = 0;
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
            node.count++;
        }
    }
    getAllShortestPrefix(word){
        let node = this.root;
        let prefix = "";
        
        for(let ch of word){
            prefix += ch;
            if(node.children[ch].count === 1){
                return prefix;
            }
            node = node.children[ch];
        }
    
        return "";
    }
}