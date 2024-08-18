let range = {
    from: 1,
    to: 5,
};

range[Symbol.asyncIterator] = function () {
    return {
        current: this.from,
        last: this.to,
        async next() {
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (this.current <= this.last) {
                return { done: false, value: this.current++ };
            } else {
                return { done: true };
            }
        },
    };
}

// use case
const iterate = async (object) => {
    for await (let value of object) {
        console.log(value);
    }
}

iterate(range);