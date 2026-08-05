
class Solution {

    countFriendsPairings(n) {
        // code here
        if(n<=2){
            return n;
        }
        return this.countFriendsPairings(n-1) + (n-1)*this.countFriendsPairings(n-2);
    }
}