


class Solution {
public:
    int rob(vector<int>& nums) {
        
        // dp[i] -> maximum amount of money being robbed till Index i.

        int n = nums.size();

        if(n == 1){
            return nums[0];
        }

        vector<int>dp(n, 0);

        //base cases
        dp[0] = nums[0];
        dp[1] = max(nums[1], nums[0]);

        for(int i = 2; i<n; i++){

            //2 scenarios
            int steal = nums[i] + dp[i - 2];
            int notSteal = dp[i - 1];

            dp[i] = max(steal, notSteal);

        }

        return dp[n - 1];



    }
};



class Solution {
public:
    int uniquePaths(int n, int m) {
        
        // dp[i][j] -> total number of ways by which you can reach n-1, m-1 cell 
        // from i, j cell.


        //matrix n * m size
        vector<vector<int>>dp(n, vector<int>(m, 0));

        //last col
        for(int i = 0; i<n; i++){
            dp[i][m - 1] = 1;
        }

        //last row
        for(int i = 0; i<m; i++){
            dp[n - 1][i] = 1;
        }

        for(int i = n - 2; i>=0; i--){
            for(int j = m-2; j>=0; j--){

                int waysMovingRight = dp[i][j + 1];
                int waysMovingDown = dp[i + 1][j];

                dp[i][j] = waysMovingRight + waysMovingDown;

            }
        }

        return dp[0][0];

    }
};

 class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& grid) {
        
        // dp[i][j] -> number of uniqye paths to reach n-1, m-1 cell from 
        // i,j cell considering there are obstacles/lions/mountains in your path.

        int row = grid.size();
        int col = grid[0].size();
        
        if(grid[0][0] == 1 or grid[row-1][col - 1] == 1){
            return 0; //0 ways since lion is there
        }

        vector<vector<long long>>dp(row, vector<long long>(col, 0));

        bool lionSeenLastRow = false;
        bool lionSeenLastCol = false;


        //base cases
        //last row
        for(int i = col - 1; i>=0; i--){

            // 1. is there a lion in the cell? 
            // 2. is there any lion in your path ahead?
            if(grid[row - 1][i] == 0 and lionSeenLastRow == false){
                dp[row - 1][i] = 1;
            }else{
                lionSeenLastRow = true;
                dp[row - 1][i] = 0;
            }

        }


        //last col
        for(int i = row - 1; i>=0; i--){

            if(grid[i][col - 1] == 0 and lionSeenLastCol == false){
                dp[i][col - 1] = 1;
            }else{
                lionSeenLastCol = true;
                 dp[i][col - 1] = 0;
            }
        }



        for(int r = row - 2; r >= 0; r--){
            for(int c = col - 2; c >= 0; c--){

                //if there is no lion then calculate
                if(grid[r][c] != 1){
                    long waysFromRight = dp[r][c + 1];
                    long waysFromDown = dp[r + 1][c];

                    dp[r][c] = waysFromRight + waysFromDown;
                }

            }
        }



        return dp[0][0];

    }
};


class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        
        //dp[i][j] -> min path sum from i,j cell to reach n-1,m-1 cell

        int n = grid.size();
        int m =grid[0].size();

        vector<vector<int>>dp(n, vector<int>(m, 0));
        int moveUp = 0;
        int moveLeft = 0;

        //last row
        for(int i = m - 1; i>=0; i--){
            moveLeft += grid[n - 1][i];
            dp[n-1][i] = moveLeft;
        }

        //last col
        for(int i = n - 1; i>=0; i--){
            moveUp += grid[i][m - 1];
            dp[i][m-1] = moveUp;
        }




        for(int i = n - 2; i>=0;i--){
            for(int j = m-2; j>=0;j--){

                int minPathSumMovingRight = dp[i][j + 1];
                int minPathSumMovingDown = dp[i + 1][j];

                dp[i][j] = grid[i][j] + min(minPathSumMovingRight, minPathSumMovingDown);
            }
        }

        return dp[0][0];


    }
};





