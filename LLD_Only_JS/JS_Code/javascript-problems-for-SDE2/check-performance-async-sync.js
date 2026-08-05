async function measurePeformance(cb, {name = 'BenchMark', iterations = 5, warmup = true, logResults = true} = {}){
    if(warmup){
        try{
           await cb();
        }
        catch(err){
            return new Error("Error Received with this function");
        }
    }
    
    let measurePerformaceArr = [];
    for(let i = 0; i<iterations; i++){
         const startTime = performance.now();
         await cb();
         const endTime = performance.now();
         const totalTime = endTime - startTime;
         measurePerformaceArr.push(Number(totalTime.toFixed(2)));
    }
    const total = measurePerformaceArr.reduce((sum, t)=> sum+t, 0);
    const average = Number((total/iterations).toFixed(2));
    if(logResults){
        console.log(name, " ", measurePerformaceArr, " ", average+"ms")
    }
    return {
        name : name,
        timings: measurePerformaceArr,
        average: Number(average.toFixed(2))+"ms",
        min: Math.min(...measurePerformaceArr)+"ms",
        max: Math.max(...measurePerformaceArr)+"ms"
    }
}

const syncFunction = ()=>{
    let sum = 0;
    for(let i = 0;i<100000; i++){
        sum += i;
    }
    return sum;
}
(async ()=>{
    const result = await  measurePeformance(syncFunction, {
        name: 'Sync Calculation',
        iterations: 5,
        warmup: true,
        logResults: true
        });
        console.log(result);
})()


const asyncFunction = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return 'done';
};

(async ()=>{
    const result = await measurePeformance(asyncFunction, {
        name: 'Async Calculation',
        iterations: 5,
        warmup: true,
        logResults: true
        });
        console.log(result);
})()

// to be implemented
// compare two functions

// comparePerformance([
//   { fn: syncFunction, name: 'Sync Calculation' },
//   { fn: asyncFunction, name: 'Async Operation' }
// ], {
//   iterations: 5,
//   warmup: true
// });