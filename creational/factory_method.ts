interface IProduct {
    operation(): string;
}

abstract class Creator {
    public abstract factoryMethod(): IProduct;

    public someOperation(): string {
        const product = this.factoryMethod();
        return product.operation();
    }
}

class CreatorA extends Creator {
    public factoryMethod(): IProduct {
        return new ProductA();
    }
}

class ProductA implements IProduct {
    public operation(): string {
        return 'ProductA';
    }
}

// client code
const creatorA = new CreatorA();
console.log(creatorA.someOperation());