abstract class AbstractClass {
    public templateMethod(): void {
        this.baseActionOne();
        this.requiredActionOne();
        this.baseActionTwo();
        this.hookOne();
        this.requiredActionTwo();
        this.baseActionThree();
        this.hookTwo();
    }

    protected baseActionOne(): void {
        console.log('AbstractClass: I\'m doing some job');
    }

    protected baseActionTwo(): void {
        console.log('AbstractClass: but I allow subclasses to override some actions');
    }

    protected baseActionThree(): void {
        console.log('AbstractClass: but I still do the bulk of the work');
    }

    protected abstract requiredActionOne(): void;
    protected abstract requiredActionTwo(): void;

    protected hookOne(): void { }
    protected hookTwo(): void { }
}

class ClassA extends AbstractClass {
    protected requiredActionOne(): void {
        console.log('ClassA: implemented action one');
    }

    protected requiredActionTwo(): void {
        console.log('ClassA: implemented action two');
    }
}

class ClassB extends AbstractClass {
    protected requiredActionOne(): void {
        console.log('ClassB: implemented action one');
    }

    protected requiredActionTwo(): void {
        console.log('ClassB: implemented action two');
    }

    protected hookOne(): void {
        console.log('ClassB: overridden hook one');
    }
}

// client code
const classA = new ClassA();
const classB = new ClassB();
classA.templateMethod();
classB.templateMethod();
