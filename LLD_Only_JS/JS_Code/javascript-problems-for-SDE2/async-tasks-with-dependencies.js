async function runTasks(tasks, dependencies){
    let taskObj = {}
    for(let [key, taskArr] of Object.entries(dependencies)){
       const recursion = async (taskArr)=>{
         let resultObj = {};
         for(let task of taskArr){
                const response = await tasks[task]();
                resultObj[task] = response;
        }
        return resultObj
       }
       
       const response = await recursion(taskArr);
       const response2 = await recursion([key]);
       taskObj = {...response,...taskObj, ...response2};
    }
    const result = {
        results : taskObj
    }
    return result;
}
const tasks = {
  A: async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return 'Result A';
  },
  B: async () => {
    await new Promise(resolve => setTimeout(resolve, 150));
    return 'Result B';
  },
  C: async () => {
    await new Promise((resolve) => setTimeout(resolve, 80));
    return 'Result C';
  },
  D: async () => {
    await new Promise(resolve => setTimeout(resolve, 120));
    return 'Result D (depends on A, B)';
  },
  E: async () => {
    await new Promise(resolve => setTimeout(resolve, 90));
    return 'Result E (depends on C, D)';
  }
};

const dependencies = {
  D: ['A', 'B'],
  E: ['C', 'D']
};

// Run the tasks
runTasks(tasks, dependencies)
  .then(result => {
    console.log('Final results:', result.results);
    if (!result.success) {
      console.log('Errors:', result.errors);
    }
  })
  .catch(error => {
    console.error('Error running tasks:', error);
  });

//Output:
/*
"Final results:" // [object Object] 
{
  "C": "Result C",
  "A": "Result A",
  "B": "Result B",
  "D": "Result D (depends on A, B)",
  "E": "Result E (depends on C, D)"
}
*/