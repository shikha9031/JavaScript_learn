const wait = (num)=>{
    return new Promise((resolve)=> setTimeout(resolve, num*1000, num));
}
const A = async()=>{
    return wait(2);
}
const B = async()=>{
    return wait(3);
}
const series = async()=>{
    const resultA = await A();
    const resultB = await B();
    return (resultA + resultB);
}
const parallel = async ()=>{
    const task1 =  A();
    const task2 =  B();
    let resultA = await task1;
    let resultB = await task2;
    return (resultA + resultB);
}
const evaluate = async(fn, label)=>{
    const startTime = performance.now();
    console.log(`Executing ${label} task starts`);
    let result = await fn();
    const endTime = performance.now();
    console.log(`Task ${label} finished in ${Number.parseInt(endTime - startTime)} milliseconds with sum:`, result);
}
evaluate(series, ' sequential ');
evaluate(parallel, ' parallel ');