function asyncSeriesExecuter(promises){
        const helper = async function(idx){
            if(idx >= promises.length){
                return;
            }
            const response = await promises[idx]();
            console.log(response);
            helper(idx+1);
        }
    helper(0);
}


//Input:
const asyncTask = function(i) {
 return function(){
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(`Completing ${i}`), 100*i)
  });
 }
}

const promises = [
  asyncTask(3),
  asyncTask(1),
  asyncTask(7),
  asyncTask(2),
  asyncTask(5),
];

asyncSeriesExecuter(promises);

// Output:
// "Completing 3"
// "Completing 1"
// "Completing 7"
// "Completing 2"
// "Completing 5"