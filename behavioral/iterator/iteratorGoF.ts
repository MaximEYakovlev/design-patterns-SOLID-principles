interface IIterator<T> {
    current(): T;
    next(): T;
    key(): number;
    valid(): boolean;
    reset(): void;
}

interface IAggregator {
    getIterator(): IIterator<string>;
}

interface IIteratorFactory {
    createIterator(collection: Collection): IIterator<string>;
    createReverseIterator(collection: Collection,): IIterator<string>;
}

class SomeIterator implements IIterator<string> {
    private collection: Collection;
    private position: number = 0;
    private reverse: boolean = false;

    constructor(collection: Collection, reverse: boolean = false) {
        this.collection = collection;
        this.reverse = reverse;

        if (reverse) {
            this.position = collection.getCount() - 1;
        }
    }

    public reset(): void {
        this.position = this.reverse ?
            this.collection.getCount() - 1 :
            0;
    }

    public current(): string {
        return this.collection.getItems()[this.position];
    }

    public key(): number {
        return this.position;
    }

    public next(): string {
        const item = this.collection.getItems()[this.position];
        this.position += this.reverse ? -1 : 1;
        return item;
    }

    public valid(): boolean {
        if (this.reverse) {
            return this.position >= 0;
        }

        return this.position < this.collection.getCount();
    }
}

class IteratorFactory implements IIteratorFactory {
    createIterator(collection: Collection): IIterator<string> {
        return new SomeIterator(collection);
    }

    createReverseIterator(collection: Collection): IIterator<string> {
        return new SomeIterator(collection, true);
    }
}

class Collection implements IAggregator {
    private items: string[] = [];
    private iteratorFactory: IIteratorFactory;

    constructor(iteratorFactory: IIteratorFactory) {
        this.iteratorFactory = iteratorFactory;
    }

    public getItems(): string[] {
        return this.items;
    }

    public getCount(): number {
        return this.items.length;
    }

    public addItem(item: string): void {
        this.items.push(item);
    }

    public getIterator(): IIterator<string> {
        return this.iteratorFactory.createIterator(this);
    }

    public getReverseIterator(): IIterator<string> {
        return this.iteratorFactory.createReverseIterator(this);
    }
}

// client code
const iteratorFactory = new IteratorFactory();
const collection = new Collection(iteratorFactory);

collection.addItem('first');
collection.addItem('second');
collection.addItem('third');

const iterator = collection.getIterator();
const reverseIterator = collection.getReverseIterator();

while (iterator.valid()) {
    console.log(iterator.next());
}

while (reverseIterator.valid()) {
    console.log(reverseIterator.next());
}


