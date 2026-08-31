// Revise 4 times and understand all the code

class LRUCache {
    constructor(maxSize = 100) {
        this.maxSize = maxSize;
        this.map = new Map();
    }

    set(key, value) {
        if (this.map.has(key)) {
            this.map.delete(key);
        }

        this.map.set(key, value);

        if (this.map.size > this.maxSize) {
            const oldestKey = this.map.keys().next().value;
            this.map.delete(oldestKey);
        }
    }

    get(key) {
        if (!this.map.has(key)) {
            return undefined;
        }

        const value = this.map.get(key);

        // Mark as recently used
        this.map.delete(key);
        this.map.set(key, value);

        return value;
    }

    delete(key) {
        this.map.delete(key);
    }

    clear() {
        this.map.clear();
    }
}

function memoizeCallback(fn, options = {}) {

    const {
        ttl = Infinity,
        maxSize = 100,
        key = (...args) => JSON.stringify(args),
        abort = false,
        latestWins = false
    } = options;

    const cache = new LRUCache(maxSize);
    const inFlight = new Map();

    return function (...args) {

        const callback = args.pop();
        const cacheKey = key(...args);

        // -----------------------------
        // CACHE CHECK
        // -----------------------------

        const cached = cache.get(cacheKey);

        if (cached) {

            if (Date.now() < cached.expiry) {

                queueMicrotask(() => {
                    callback(null, cached.value);
                });

                return;
            }

            // Expired
            cache.delete(cacheKey);
        }

        const existingFlight = inFlight.get(cacheKey);

        if (existingFlight) {

            if (latestWins) {
                // Cancel old request
                existingFlight.controller?.abort();
                inFlight.delete(cacheKey);
            } 
            else {
                // Reuse old request
                existingFlight.callbacks.push(callback);
                return;
            }
        }

        // -----------------------------
        // CREATE REQUEST
        // -----------------------------

        const controller =
            abort || latestWins
                ? new AbortController()
                : null;

        const flight = {
            controller,
            callbacks: [callback]
        };

        inFlight.set(cacheKey, flight);

        // -----------------------------
        // EXECUTE
        // -----------------------------

        fn(
            ...args,
            controller?.signal,
            (err, result) => {

                /*
                 * Ignore stale request.
                 *
                 * This is important for latestWins.
                 */
                if (inFlight.get(cacheKey) !== flight) {
                    return;
                }

                inFlight.delete(cacheKey);

                // -----------------------------
                // SUCCESS
                // -----------------------------

                if (!err) {

                    cache.set(cacheKey, {
                        value: result,

                        // TTL starts AFTER completion
                        expiry: Date.now() + ttl
                    });
                }

                // -----------------------------
                // NOTIFY ALL CALLERS
                // -----------------------------

                for (const cb of flight.callbacks) {
                    cb(err, result);
                }
            }
        );

        // -----------------------------
        // RETURN ABORT HANDLE
        // -----------------------------

        if (abort || latestWins) {

            return {
                abort() {

                    /*
                     * Only abort if this is
                     * still the current request.
                     */
                    if (
                        inFlight.get(cacheKey) === flight
                    ) {
                        controller.abort();
                        inFlight.delete(cacheKey);
                    }
                }
            };
        }
    };
}

function fakeSearchCb(query, signal, cb) {
  console.log(` started: ${query}`);

  const id = setTimeout(() => {
    console.log(` completed: ${query}`);
    cb(null, `result for "${query}"`);
  }, 2000);

  signal?.addEventListener("abort", () => {
    clearTimeout(id);
    console.log(` aborted: ${query}`);
    cb(new Error("Aborted"));
  });
}

const searchMemo = memoizeCallback(fakeSearchCb);

searchMemo("react", console.log); // cache miss
searchMemo("react", console.log); // cache hit