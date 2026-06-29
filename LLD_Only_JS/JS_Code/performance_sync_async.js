function measurePerformance(callback, options = {}){
    let {name = callback.name || 'Anonymous function',
        iterations = 1,
        warmup = true,
        logResults = true
    } = options;

    let results = {
        name,
        iterations,
        isAsync: callback.constructor.name === 'AsyncFunction',
        timings: [],
        average: 0,
        min: Infinity,
        max: -Infinity,
        total: 0
    }

    if(warmup){
        try{
             callback();
        }
        catch(error) {
            console.warn(`Warm up run failed to ${name}: `, error);
        }
    }
    
    for(let i = 0; i<iterations; i++){
        let performanceStart = performance.now();
        try{
              callback();
        }
        catch(error){
            console.warn(`Error in iterations for ${i+1} for ${name}: `, error);
            continue;
        }
       
        let performanceEnd = performance.now();
        const duration = performanceEnd - performanceStart;
        // compute and store the results
        results.timings.push(duration);
        results.min = Math.min(results.min, duration);
        results.max = Math.max(results.max, duration);
        results.total += duration;
    }

    // calculate averages
  results.average = results.total / results.timings.length;

  // log results
  if (logResults) {
    console.log(`\nPerformance Results for ${name}:`);
    console.log('----------------------------------------');
    console.log(`Type: ${results.isAsync ? 'Async' : 'Sync'}`);
    console.log(`Iterations: ${iterations}`);
    console.log(`Average: ${results.average.toFixed(2)}ms`);
    console.log(`Min: ${results.min.toFixed(2)}ms`);
    console.log(`Max: ${results.max.toFixed(2)}ms`);
    console.log('----------------------------------------\n');
  }
  return results;
   
}

async function comparePerformance(functions, options = {}) {
  const { logResults } = options;
  const results = [];
  
  for (const { fn, name } of functions) {
    const result = await measurePerformance(fn, { ...options, name });
    results.push(result);
  }

  // sort results by average time
  results.sort((a, b) => a.average - b.average);

  if (logResults !== false) {
    console.log('\nPerformance Comparison:');
    console.log('----------------------------------------');
    results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.name}:`);
      console.log(`   Average: ${result.average.toFixed(2)}ms`);
      console.log(`   Min: ${result.min.toFixed(2)}ms`);
      console.log(`   Max: ${result.max.toFixed(2)}ms`);
    });
    console.log('----------------------------------------\n');
  }

  return results;
}

// normal function
const syncFunction = () => {
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }
  return sum;
};

// measure performance of the normal function
measurePerformance(syncFunction, {
  name: 'Sync Calculation',
  iterations: 5,
  warmup: true
});

// async function
const asyncFunction = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return 'done';
};

// compare two functions
measurePerformance(asyncFunction, {
  name: 'Async Calculation',
  iterations: 5,
  warmup: true
});

comparePerformance([
  { fn: syncFunction, name: 'Sync Calculation' },
  { fn: asyncFunction, name: 'Async Operation' }
], {
  iterations: 5,
  warmup: true
});

Output:
"Performance Results for Sync Calculation:"
"----------------------------------------"
"Type: Sync"
"Iterations: 5"
"Average: 2.40ms"
"Min: 2.00ms"
"Max: 3.00ms"
"----------------------------------------"

"Performance Results for Async Operation:"
"----------------------------------------"
"Type: Async"
"Iterations: 5"
"Average: 104.40ms"
"Min: 100.00ms"
"Max: 113.00ms"
"----------------------------------------"

"Performance Comparison:"
"----------------------------------------"
"1. Sync Calculation:"
"   Average: 2.40ms"
"   Min: 2.00ms"
"   Max: 3.00ms"

"2. Async Operation:"
"   Average: 104.40ms"
"   Min: 100.00ms"
"   Max: 113.00ms"
"----------------------------------------"