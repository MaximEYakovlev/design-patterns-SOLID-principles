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