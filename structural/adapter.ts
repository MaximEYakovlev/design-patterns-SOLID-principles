interface IAdaptee {
    specificRequest(): string;
}

class Target {
    public request(): string {
        return 'Target: default behavior';
    }
}

class Adaptee implements IAdaptee {
    public specificRequest(): string {
        return 'roivaheb laiceps eetpadA';
    }
}

class Adapter extends Target {
    private adaptee: IAdaptee;

    constructor(adaptee: IAdaptee) {
        super();
        this.adaptee = adaptee;
    }

    public request(): string {
        const result = this.adaptee.specificRequest().split('').reverse().join('');
        return `Adapter: ${result}`;
    }
}

// client code
const clientCode = (target: Target): void => {
    console.log(target.request());
}

const target = new Target();
const adaptee = new Adaptee();
const adapter = new Adapter(adaptee);

clientCode(target);
console.log(adaptee.specificRequest());
clientCode(adapter);