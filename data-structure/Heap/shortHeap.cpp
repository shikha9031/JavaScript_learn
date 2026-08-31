#include<bits/stdc++.h>
using namespace std;

void heapify(vector<int>&arr, int n, int i){

    int largest = i;

    int leftChild = 2 * i + 1;
    int rightChild = 2 * i + 2;

    if(leftChild < n and arr[leftChild] > arr[largest]){
        largest = leftChild;
    }

    if(rightChild < n and arr[rightChild] > arr[largest]){
        largest = rightChild;
    }

    if(largest != i){
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest); //keep bubbling Up
    }
}

void heapSort(vector<int>&arr){

    int n = arr.size();

    //make the whole array as max heap
    for(int i = n / 2 - 1; i>=0; i--){
        heapify(arr, n, i);
    }

    //sorting 
    for(int i = n - 1; i>0; i--){
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }



}


int main(){

    vector<int>arr = {10,4,9,7,3};
    heapSort(arr);

}

// Greedy Algorithm
#include<bits/stdc++.h>
using namespace std;


bool compare(const vector<int>&a, const vector<int>&b){
    return a[1] < b[1];
}

int activitySelection(vector<int>&start, vector<int>&finish){

    vector<vector<int>>arr;
    int n = start.size();

    for(int i = 0; i < n; i++){
        arr.push_back({start[i], finish[i]});
    }

    sort(arr.begin(), arr.end(), compare);


    int ans = 1;

    int j = 0;

    for(int i = 1; i<n; i++){

        // finish time at last completed job < current start time
        if(arr[j][1] < arr[i][0]){
            ans++;
            j = i;
        }

    }

    return ans;


}


int main(){

    vector<int>start = {1,3,0,5,8,5};
    vector<int>finish = {2,4,6,7,9,9};

    int ans = activitySelection(start, finish);

    cout << ans  << endl;


}
