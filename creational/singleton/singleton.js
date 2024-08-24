class Fun {
    static instance = null;

    constructor() {
        if (Fun.instance) {
            throw new Error("use Fun.getInstance() method to get the singleton instance");
        }

        Fun.instance = this;
    }

    static getInstance() {
        if (!Fun.instance) {
            Fun.instance = new Fun();
        }

        return Fun.instance;
    }
}

// use case
const objOne = Fun.getInstance();
const objTwo = Fun.getInstance();

console.log(objOne === objTwo);
