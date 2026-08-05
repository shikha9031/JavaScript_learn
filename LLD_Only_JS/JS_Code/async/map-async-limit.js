//Solution (Callback API)

function mapLimit(arr, limit, fn) {
    return new Promise((resolve, reject) => {
        if (arr.length === 0) {
            return resolve([]);
        }

        limit = Math.min(limit, arr.length);

        const result = new Array(arr.length);

        let nextIndex = 0;
        let completed = 0;
        let rejected = false;

        function worker() {
            if (rejected) return;

            if (nextIndex >= arr.length) {
                return;
            }

            const currentIndex = nextIndex++;

            fn(arr[currentIndex], (err, value) => {
                if (rejected) return;

                if (err) {
                    rejected = true;
                    reject(err);
                    return;
                }

                result[currentIndex] = value;
                completed++;

                if (completed === arr.length) {
                    resolve(result);
                    return;
                }

                worker();
            });
        }

        for (let i = 0; i < limit; i++) {
            worker();
        }
    });
}

mapLimit([1,2,3,4,5],3,function(num,cb){
    setTimeout(()=>{
        console.log(num*2);
        cb(null,num*2);
    },2000);
}).then(console.log);

// error case
mapLimit([1,2,3,4,5],3,function(num,cb){
    setTimeout(()=>{
        if(num===3){
            cb("Error");
            return;
        }

        cb(null,num*2);
    },2000);
})
.then(console.log)
.catch(console.log);

//Async/Await Version

async function mapLimit(arr, limit, fn) {
    const result = new Array(arr.length);

    let nextIndex = 0;

    async function worker() {
        while (true) {
            const current = nextIndex++;

            if (current >= arr.length) {
                return;
            }

            result[current] = await fn(arr[current]);
        }
    }

    const workers = [];

    limit = Math.min(limit, arr.length);

    for (let i = 0; i < limit; i++) {
        workers.push(worker());
    }

    await Promise.all(workers);

    return result;
}

const result = await mapLimit(
    [1,2,3,4,5],
    3,
    async (num) => {
        await new Promise(r => setTimeout(r, 2000));
        return num * 2;
    }
);

console.log(result);