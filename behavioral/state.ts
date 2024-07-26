abstract class State {
    protected context: Context;
    protected logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    public setContext(context: Context) {
        this.context = context;
    }

    public abstract handleOne(): void;
    public abstract handleTwo(): void;
}

class Context {
    private state: State;
    private logger: Logger;

    constructor(state: State, logger: Logger) {
        this.logger = logger;
        this.setState(state);
    }

    public setState(state: State): void {
        this.state = state;
        this.state.setContext(this);
        this.logger.log(`Context: set to ${state.constructor.name}`);
    }

    public actionOne(): void {
        this.state.handleOne();
    }

    public actionTwo(): void {
        this.state.handleTwo();
    }
}

class StateA extends State {
    private static instance: StateA;

    private constructor(logger: Logger) {
        super(logger);
    }

    public static getInstance(logger: Logger): StateA {
        if (!StateA.instance) {
            StateA.instance = new StateA(logger);
        }
        return StateA.instance;
    }

    public handleOne(): void {
        this.logger.log('StateA handles actionOne');
        this.context.setState(StateB.getInstance(this.logger));
        this.logger.log('StateA has changed the state of the context');
    }

    public handleTwo(): void {
        this.logger.log('StateA handles actionTwo');
    }
}

class StateB extends State {
    private static instance: StateB;

    private constructor(logger: Logger) {
        super(logger);
    }

    public static getInstance(logger: Logger): StateB {
        if (!StateB.instance) {
            StateB.instance = new StateB(logger);
        }
        return StateB.instance;
    }

    public handleOne(): void {
        this.logger.log('StateB handles actionOne');
    }

    public handleTwo(): void {
        this.logger.log('StateB handles actionTwo');
        this.context.setState(StateA.getInstance(this.logger));
        this.logger.log('StateB has changed the state of the context');
    }
}

class Logger {
    public log(message: string): void {
        console.log(message);
    }
}

// client code
const logger = new Logger();
const stateA = StateA.getInstance(logger);
const context = new Context(stateA, logger);
context.actionOne();
context.actionTwo();