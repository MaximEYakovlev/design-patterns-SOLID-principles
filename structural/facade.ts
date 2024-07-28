interface ISystemOne {
    operationOne(): string;
    operationA(): string;
}

interface ISystemTwo {
    operationOne(): string;
    operationB(): string;
}

class Facade {
    protected systemOne: ISystemOne;
    protected systemTwo: ISystemTwo;

    constructor(systemOne?: ISystemOne, systemTwo?: ISystemTwo) {
        this.systemOne = systemOne || new SystemOne();
        this.systemTwo = systemTwo || new SystemTwo();
    }

    public operation(): string {
        let result = 'Facade calls the methods of the systems:\n';
        result += this.systemOne.operationOne();
        result += this.systemOne.operationA();
        result += this.systemTwo.operationOne();
        result += this.systemTwo.operationB();

        return result;
    }
}

class SystemOne implements ISystemOne {
    public operationOne(): string {
        return 'SystemOne: operation one\n';
    }

    public operationA(): string {
        return 'SystemOne: operation A\n';
    }
}

class SystemTwo implements ISystemTwo {
    public operationOne(): string {
        return 'SystemTwo: operation one\n';
    }

    public operationB(): string {
        return 'SystemTwo: operation B\n';
    }
}

// client code
const clientCode = (facade: Facade): void => {
    console.log(facade.operation());
}

const systemOne = new SystemOne();
const systemTwo = new SystemTwo();
const facade = new Facade(systemOne, systemTwo);

clientCode(facade);