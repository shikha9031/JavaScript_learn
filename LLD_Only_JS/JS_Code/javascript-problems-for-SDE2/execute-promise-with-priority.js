//parallel execution

function priorityResolve(promises){
    return new Promise((resolve, reject)=>{
        const states = promises.map(()=>({
            status: 'pending',
            value: undefined,
            reason: undefined
        }))

        let rejectedCount = 0;
        promises.map((promise, idx)=>{
            Promise.resolve(promise).then((res)=>{
                states[idx] = {value: res, status:'fulfilled'}
                resolve(res);
            }).catch((err)=>{
                states[idx] = {reason: err, status:'rejected'};
                rejectedCount++;
                if(rejectedCount === states.length){
                     let err = states.map(s => s.reason);
                    reject(new AggregateError(err, "All promises rejected"))
                }
            })
        })
    })
}

const p0 = new Promise((res, rej) => setTimeout(() => rej('A'), 400));
const p1 = new Promise((res, rej) => setTimeout(() => rej('B'), 100));
const p2 = new Promise((res, rej) => setTimeout(() => rej('C'), 200));

priorityResolve([p0, p1, p2])
  .then(console.log).catch(err => {console.log(err)});

// Sequential Execution
async function priorityResolveSequential(promises) {
  for (const p of promises) {
    try {
      return await p;
    } catch {}
  }
  
  throw new Error('All promises rejected');
}



const p0 = new Promise((res, rej) => setTimeout(() => rej('A'), 400));
const p1 = new Promise((res, rej) => setTimeout(() => rej('B'), 100));
const p2 = new Promise((res, rej) => setTimeout(() => rej('C'), 200));

priorityResolveSequential([p0, p1, p2])
  .then(console.log).catch(err => {console.log(err)});