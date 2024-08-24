class Fun {
    static instance = null;

    constructor() {
        if (Fun.instance) {
            return Fun.instance;
        }
        Fun.instance = this;
    }
}

// use case
const objOne = new Fun();
const objTwo = new Fun();

console.log(objOne === objTwo);
