interface IObservable {
    subscribe(observer: IObserver): void;
    unsubscribe(observer: IObserver): void;
    notify(): void;
}

interface IObserver {
    update(subject: IObservable): void
}

class StateManager {
    private _state: number = 0;

    get state(): number {
        return this._state;
    }

    set state(value: number) {
        this._state = value;
    }
}

class Subject implements IObservable {
    private observers: IObserver[] = [];
    private stateManager: StateManager;

    constructor(stateManager: StateManager) {
        this.stateManager = stateManager;
    }

    subscribe(observer: IObserver): void {
        const subscribed = this.observers.includes(observer);

        if (subscribed) {
            console.log('Subject: the observer has already subscribed');
        } else {
            this.observers.push(observer);
            console.log('Subject: the observer is subscribed');
        }
    }

    unsubscribe(observer: IObserver): void {
        const index = this.observers.indexOf(observer);

        if (index === -1) {
            console.log('Subject: the observer does not exist');
        } else {
            this.observers.splice(index, 1);
            console.log('Subject: the observer has been unsubscribed');
        }
    }

    notify(): void {
        this.observers.forEach(observer => observer.update(this));
        console.log('Subject: the observers have been notified');
    }

    performAction(): void {
        this.stateManager.state = Math.floor(Math.random() * (10 + 1));
        console.log(`Subject: the state has been changed to: ${this.stateManager.state}`);
        this.notify();
    }

    get state(): number {
        return this.stateManager.state;
    }
}

class Observer implements IObserver {
    public update(subject: IObservable): void {
        if (subject instanceof Subject && subject.state > 3) {
            console.log('Observer: reacted to the action');
        }
    }
}

// client code
const stateManager = new StateManager();
const subject = new Subject(stateManager);
const observer = new Observer();
subject.subscribe(observer);
subject.performAction();
subject.unsubscribe(observer);