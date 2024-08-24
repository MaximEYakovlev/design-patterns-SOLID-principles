class Singleton {
    static instance: Singleton;

    private constructor() { }

    public static get _instance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    public someLogic() { }
}

// client code
const objectOne = Singleton._instance;
const objectTwo = Singleton._instance;
console.log(objectOne === objectTwo);
