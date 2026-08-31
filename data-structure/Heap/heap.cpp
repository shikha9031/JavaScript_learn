/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        
        int n = lists.size();

        priority_queue<int, vector<int>, greater<int>>PQ;

        for(int i = 0; i<n; i++){

            //head node of linkedList
            ListNode * temp = lists[i];

            //travesring on that linkedList
            while(temp != NULL){
                PQ.push(temp -> val);
                temp = temp -> next;
            }

        }


        ListNode * dummyNode = new ListNode(-1);
        ListNode * k = dummyNode;


        while(PQ.size() != 0){
            int element = PQ.top();
            PQ.pop();

            //making a node 
            ListNode * node = new ListNode(element);

            k -> next = node;
            k = k -> next;
        }

        return dummyNode -> next;

    }
};