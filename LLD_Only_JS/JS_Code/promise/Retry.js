const loadLibrary = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const number = Math.floor(Math.random() * 10);
      // will work ~ 30% times
      if (number >= 7) {
        resolve("OK - Geolocation library loaded");
      }
      reject("ERROR");
    }, 500);
  });

const retry = (callback, times = 3) => {
  let numberOfTries = 0;
  return new Promise((resolve) => {
    const interval = setInterval(async () => {
      numberOfTries++;
      if (numberOfTries === times) {
        console.log(`Trying for the last time... (${times})`);
        clearInterval(interval);
      }
      try {
        await callback();
        clearInterval(interval);
        console.log(`Operation successful, retried ${numberOfTries} times.`);
        resolve();
      } catch (err) {
        console.log(`Unsuccessful, retried ${numberOfTries} times... ${err}`);
      }
    }, 2500);
  });
};

retry(loadLibrary);