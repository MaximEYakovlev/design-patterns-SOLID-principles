interface IAbstractFactory {
    createProductA(): IAbstractProductA;
    createProductB(): IAbstractProductB;
}

interface IAbstractProductA {
    functionCreateA(): string;
}

interface IAbstractProductB {
    functionCreateB(): string;
    anotherFunctionCreateB(collaborator: IAbstractProductA): string;
}

class FactoryA implements IAbstractFactory {
    public createProductA(): IAbstractProductA {
        return new ProductAOne();
    }

    public createProductB(): IAbstractProductB {
        return new ProductBOne();
    }
}

class FactoryB implements IAbstractFactory {
    public createProductA(): IAbstractProductA {
        return new ProductATwo();
    }

    public createProductB(): IAbstractProductB {
        return new ProductBTwo();
    }
}

class ProductAOne implements IAbstractProductA {
    public functionCreateA(): string {
        return 'the result of the product \'A one\'';
    }
}

class ProductATwo implements IAbstractProductA {
    public functionCreateA(): string {
        return 'the result of the product \'A two\'';
    }
}

class ProductBOne implements IAbstractProductB {
    public functionCreateB(): string {
        return 'the result of the product \'B one\'';
    }

    public anotherFunctionCreateB(collaborator: IAbstractProductA): string {
        const result = collaborator.functionCreateA();

        return `the result of Collaboration \'B one\' with (${result})`;
    }
}

class ProductBTwo implements IAbstractProductB {
    public functionCreateB(): string {
        return 'the result of the product \'B two\'';
    }

    public anotherFunctionCreateB(collaborator: IAbstractProductA): string {
        const result = collaborator.functionCreateA();

        return `the result of Collaboration \'B two\' with (${result})`;
    }
}

// client code
interface ILogger {
    log(message: string): void;
}

class Logger implements ILogger {
    public log(message: string): void {
        console.log(message);
    }
}

const clientCode = (factory: IAbstractFactory, logger: ILogger): void => {
    const productA = factory.createProductA();
    const productB = factory.createProductB();

    logger.log(productB.functionCreateB());
    logger.log(productB.anotherFunctionCreateB(productA));
}

const factoryA = new FactoryA();
const factoryB = new FactoryB();
const logger = new Logger();

clientCode(factoryA, logger);
clientCode(factoryB, logger);
