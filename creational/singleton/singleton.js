const Singleton = (function () {
    let instance;

    function createInstance() {
        const object = new Object('I am the instance');
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

// use case
const instanceOne = Singleton.getInstance();
const instanceTwo = Singleton.getInstance();

console.log(instanceOne === instanceTwo);
