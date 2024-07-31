interface IBuilder {
    createComponentA(): void;
    createComponentB(): void;
    createComponentC(): void;
}

class Builder implements IBuilder {
    private product!: Product;

    constructor() {
        this.reset();
    }

    public reset(): void {
        this.product = new Product();
    }

    public createComponentA(): void {
        this.product.components.push('Component A');
    }

    public createComponentB(): void {
        this.product.components.push('Component B');
    }

    public createComponentC(): void {
        this.product.components.push('Component C');
    }

    public getProduct(): Product {
        const product = this.product;
        this.reset();
        return product;
    }
}

class Product {
    public components: string[] = [];

    public componentList(): void {
        console.log(`component list: ${this.components.join(', ')}\n`);
    }
}

class Manager {
    private builder!: IBuilder;

    public setBuilder(builder: IBuilder): void {
        this.builder = builder;
    }

    public createMinimalViableProduct(): void {
        this.builder.createComponentA();
    }

    public createFullFeaturedProduct(): void {
        this.builder.createComponentA();
        this.builder.createComponentB();
        this.builder.createComponentC();
    }
}

// client code
const clientCode = (manager: Manager): void => {
    const builder = new Builder();
    manager.setBuilder(builder);

    manager.createMinimalViableProduct();
    builder.getProduct().componentList();

    manager.createFullFeaturedProduct();
    builder.getProduct().componentList();

    builder.createComponentA();
    builder.createComponentC();
    builder.getProduct().componentList();
}

const manager = new Manager();
clientCode(manager);
