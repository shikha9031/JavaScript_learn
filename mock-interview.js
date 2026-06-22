/**
 * arr[] = {2, 7, 9, 8, 5, 7, 4}, k = 5
 * output: 1
 * arr[] = {2,1, 7, 9, 8, 5, 7, 4}, k = 5
 * 
 */

/**
 * 
 * Input: head: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> NULL, k = 2
Output: head: 2 -> 1 -> 4 -> 3 -> 6 -> 5 -> NULL 
Explanation : Linked List is reversed in a group of size k = 2.
 */

var reverseKGroup = function(head, k) {
    if(!head || !head.next || k === 1){
        return head;
    }
    let curr = head;
    let length = 0;
    let newHead = null;

    while(curr !== null){
        curr = curr.next;
        length++;
    }

    curr = head;
    let prevNode = null;

    while(length >= k){
        let node = getKthNode(curr, k);
        let temp = node.next;
        node.next = null;
        const reversedList =  reverse(curr);
        if(prevNode){
            prevNode.next = reversedList;
        }
        if(newHead === null){
            newHead = reversedList;
        }
        curr.next = temp;
        prevNode = curr;
        curr = curr.next;
        length = length - k;
    }
    return newHead || list;
};

function reverse(node){
   let prev = null;
    while(node !== null){
        let temp = node.next;
        node.next = prev;
        prev = node;
        node = temp;
    }
    return prev;
}

function getKthNode(node, k){
    k--;
    while(node !== null && k>0){
        k--;
        node = node.next;
    }
    return node;
}

// Minimum Swap Question

function minimumSwap(arr, k){
    let elementLessThanOrEqualK = 0;

for(let i = 0; i<arr.length; i++){
    if(arr[i] <= k){
        elementLessThanOrEqualK++;
    }
}
let windowRange = elementLessThanOrEqualK;

let left = 0;
let elementGreaterThanK = 0;
let miniSwap = Infinity;
for(let right = 0; right<arr.length; right++){
    if(arr[right]>k){
        elementGreaterThanK++;
    }
    let currWid = right - left + 1;
    if(currWid === windowRange){
        miniSwap = Math.min(miniSwap, elementGreaterThanK);
        if(arr[left]>k){
            elementGreaterThanK--;
        }
        left++;
    }
}
return miniSwap;
}

let arr = [2, 1, 7, 9, 8, 5, 7, 4];
let k = 5;
console.log(minimumSwap(arr, k))