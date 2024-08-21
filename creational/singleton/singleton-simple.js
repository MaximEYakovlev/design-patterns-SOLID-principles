class Fun {
    static instance = null;

    constructor() {
        if (Fun.instance) {
            return Fun.instance;
        }
        Fun.instance = this;
    }
}
