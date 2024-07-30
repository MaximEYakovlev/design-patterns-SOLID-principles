interface IPrototype {
    clone(): IPrototype;
}

type Primitive = string | number | boolean;

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

// client code
function clientCode() {
    const prototypeA = new Prototype();
    prototypeA.primitive = 17;
    prototypeA.component = new Date();
    prototypeA.circularReference = new ComponentWithBackReference(prototypeA);

    const prototypeB = prototypeA.clone();
    
    if (prototypeA.primitive === prototypeB.primitive) {
        console.log(true);
    } else {
        console.log(false);
    }

    if (prototypeA.component === prototypeB.component) {
        console.log(false);
    } else {
        console.log(true);
    }

    if (prototypeA.circularReference === prototypeB.circularReference) {
        console.log(false);
    } else {
        console.log(true);
    }

    if (prototypeA.circularReference.prototype === prototypeB.circularReference.prototype) {
        console.log(false);
    } else {
        console.log(true);
    }
}

clientCode();