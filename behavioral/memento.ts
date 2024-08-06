interface IOriginator {
    save(): IMemento;
    restore(memento: IMemento): void;
    doSomeJob(): void;
}

interface IMemento {
    getState(): string;
    getName(): string;
    getDate(): string;
}

interface ICaretaker {
    backup(): void;
    undo(): void;
    showHistory(): void;
}

class Originator implements IOriginator {
    private state: string;

    constructor(state: string) {
        this.state = state;
        console.log(`Originator: initial state: ${state}`);
    }

    public doSomeJob(): void {
        console.log('Originator: some kind of job is being done');
        this.state = this.generateRandomString(26);
        console.log(`Originator: the state has changed to: ${this.state}`);
    }

    private generateRandomString(length: number = 10): string {
        const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return Array.from({ length },
            () => charSet.charAt(Math.floor(Math.random() * charSet.length)))
            .join('');
    }

    public save(): IMemento {
        return new Memento(this.state);
    }

    public restore(memento: IMemento): void {
        this.state = memento.getState();
        console.log(`Originator: the state has changed to: ${this.state}`);
    }
}

class Memento implements IMemento {
    private state: string;
    private date: string;

    constructor(state: string) {
        this.state = state;
        this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    public getState(): string {
        return this.state;
    }

    public getName(): string {
        return `${this.date} / (${this.state.substr(0, 9)}...)`;
    }

    public getDate(): string {
        return this.date;
    }
}

class Caretaker implements ICaretaker {
    private mementos: IMemento[] = [];
    private originator: IOriginator;

    constructor(originator: IOriginator) {
        this.originator = originator;
    }

    public backup(): void {
        console.log('Caretaker: saving Originator\'s state');
        this.mementos.push(this.originator.save());
    }

    public undo(): void {
        if (!this.mementos.length) {
            return;
        }

        const memento = this.mementos.pop();

        if (memento) {
            console.log(`Caretaker: state rollback to: ${memento.getName()}`);
            this.originator.restore(memento);
        }
    }

    public showHistory(): void {
        console.log('Caretaker: list of mementos:');
        this.mementos.forEach((memento) => {
            console.log(memento.getName());
        })
    }
}