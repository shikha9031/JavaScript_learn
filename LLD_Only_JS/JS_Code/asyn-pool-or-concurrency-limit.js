
/**
 * I maintain a collection of currently running promises. When the number of running promises reaches the limit,
 *  I wait for the first one to finish using Promise.race(). As soon as a slot becomes free, I start the next task
 * @param {*} tasks 
 * @param {*} limit 
 * @returns 
 */
async function asyncPool(tasks, limit) {
  const results = [];
  const executing = new Set();

  for (const task of tasks) {
    const p = Promise.resolve().then(task);

    results.push(p);
    executing.add(p);

    p.finally(() => executing.delete(p));

    if (executing.size >= limit) {
      await Promise.race(
        [...executing].map(p => p.catch(() => {}))
      );
    }
  }

  return Promise.all(results);
}