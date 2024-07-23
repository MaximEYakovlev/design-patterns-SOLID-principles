interface ICommand {
    execute(): void;
}

class Command implements ICommand {
    private receiver: Receiver;
    private argA: string;
    private argB: string;

    constructor(receiver: Receiver, argA: string, argB: string) {
        this.receiver = receiver;
        this.argA = argA;
        this.argB = argB;
    }

    public execute(): void {
        this.receiver.jobA(this.argA);
        this.receiver.jobB(this.argB);
    }
}

class Receiver {
    jobA(argA: string): void {
        console.log(`job: ${argA}`);
    }

    jobB(argB: string): void {
        console.log(`job: ${argB}`);
    }
}

class Invoker {
    private command: ICommand;

    setCommand(command: ICommand): void {
        this.command = command;
    }

    doSomething(): void {
        this.command.execute();
    }
}

// client
const invoker = new Invoker();
const receiver = new Receiver();
const command = new Command(receiver, 'foo', 'bar');
invoker.setCommand(command);
invoker.doSomething();
