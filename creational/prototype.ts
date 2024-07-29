type Primitive = string | number | boolean;

interface IPrototype {
    primitive: Primitive;
    component: object;
    circularReference: ComponentWithBackReference;
    clone(): IPrototype;
}

class Prototype implements IPrototype {
    public primitive!: Primitive;
    public component!: object;
    public circularReference!: ComponentWithBackReference;

    public clone(): this {
        const clone = Object.create(this);

        clone.component = Object.create(this.component);
        clone.circularReference = {
            ...this.circularReference,
            prototype: { ...this },
        };

        return clone;
    }
}

class ComponentWithBackReference {
    public prototype: IPrototype;

    constructor(prototype: IPrototype) {
        this.prototype = prototype;
    }
}