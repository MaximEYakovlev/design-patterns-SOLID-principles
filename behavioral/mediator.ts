interface IMediator {
    notify(sender: object, event: string): void;
}

interface IComponent {
    setMediator(mediator: IMediator): void;
    operationA?(): void;
    operationB?(): void;
    operationC?(): void;
    operationD?(): void;
}

class Mediator implements IMediator {
    private componentOne: IComponent;
    private componentTwo: IComponent;

    constructor(componentOne: IComponent, componentTwo: IComponent) {
        this.componentOne = componentOne;
        this.componentOne.setMediator(this);
        this.componentTwo = componentTwo;
        this.componentTwo.setMediator(this);
    }

    notify(sender: object, event: string): void {
        const senderName = sender === this.componentOne ? 'ComponentOne' : 'ComponentTwo';
        const eventKey = `${senderName}_${event}`;

        switch (eventKey) {
            case 'ComponentOne_A':
                console.log(`Mediator reacts on ${event} and triggers following operations:`);
                this.componentTwo.operationC();
                break;
            case 'ComponentTwo_D':
                console.log(`Mediator reacts on ${event} and triggers following operations:`);
                this.componentOne.operationB();
                this.componentTwo.operationC();
                break;
        }
    }
}

class BaseComponent implements IComponent {
    protected mediator!: IMediator;

    setMediator(mediator: IMediator): void {
        this.mediator = mediator;
    }
}

class ComponentOne extends BaseComponent {
    public operationA(): void {
        console.log('Component one does A');
        this.mediator.notify(this, 'A');
    }

    public operationB(): void {
        console.log('Component one does B');
        this.mediator.notify(this, 'B');
    }
}

class ComponentTwo extends BaseComponent {
    public operationC(): void {
        console.log('Component two does C');
        this.mediator.notify(this, 'C');
    }

    public operationD(): void {
        console.log('Component two does D');
        this.mediator.notify(this, 'D');
    }
}

// client code
const componentOne = new ComponentOne();
const componentTwo = new ComponentTwo();
const mediator = new Mediator(componentOne, componentTwo);

componentOne.operationA();
componentTwo.operationD();



