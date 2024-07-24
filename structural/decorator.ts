interface IComponent {
    operation(): string;
}

class Component implements IComponent {
    public operation(): string {
        return 'component';
    }
}

abstract class Decorator implements IComponent {
    protected component: IComponent;

    constructor(component: IComponent) {
        this.component = component;
    }

    public abstract operation(): string;
}

class DecoratorA extends Decorator {
    public operation(): string {
        return `DecoratorA(${this.component.operation()})`;
    }
}

// client code
const component = new Component();
console.log(component.operation());
const decoratorA = new DecoratorA(component);
console.log(decoratorA.operation());