const promisify = (fn) => (...args) => {
    const options = typeof args.at(-1) === 'object' ? args.pop() : {};
    let timer = null;
    let pending = true;

    const promise = new Promise((resolve, reject) => {
        const callback = (err, data) => {
            if (!pending) return;
            if (timer) clearTimeout(timer);
            if (err) reject(err);
            else resolve(data);
        };

        fn(...args, callback);

        if (options.timeout) {
            timer = setTimeout(() => {
                pending = false;
                reject(new Error('Operation canceled due to timeout'));
            }, options.timeout);
        }
    });

    return promise;
};

// use case
const fs = require('node:fs');
const read = promisify(fs.readFile);

const main = async () => {
    const fileName = '1-promisify.js';

    try {
        const data = await read(fileName, 'utf8', { timeout: 100 });
        console.log(`File "${fileName}" size: ${data.length}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

main();