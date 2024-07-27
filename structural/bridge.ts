interface IImplementation {
    operationImplementation(): string;
}

class Abstraction {
    protected implementation: IImplementation;

    constructor(implementation: IImplementation) {
        this.implementation = implementation;
    }

    public operation(): string {
        const result = this.implementation.operationImplementation();
        return `Abstraction operation:\n${result}`;
    }
}

class ExtendedAbstraction extends Abstraction {
    public operation(): string {
        const result = this.implementation.operationImplementation();
        return `ExtendedAbstraction operation:\n${result}`;
    }
}

class ImplementationA implements IImplementation {
    public operationImplementation(): string {
        return 'ImplementationA: the result on the platform A';
    }
}

class ImplementationB implements IImplementation {
    public operationImplementation(): string {
        return 'ImplementationB: the result on the platform B';
    }
}

// client code
const clientCode = (abstraction: Abstraction) => {
    console.log(abstraction.operation());
}

const implementationA = new ImplementationA();
const implementationB = new ImplementationB();
const abstraction = new Abstraction(implementationA);
const extendedAbstraction = new ExtendedAbstraction(implementationB);

clientCode(abstraction);
clientCode(extendedAbstraction);