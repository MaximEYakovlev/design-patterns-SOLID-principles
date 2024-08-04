interface IFlyweight {
    operation(uniqueState: string[]): void;
}

class Flyweight implements IFlyweight {
    private sharedState: string[];

    constructor(sharedState: string[]) {
        this.sharedState = sharedState;
    }

    public operation(uniqueState: string[]): void {
        const sState = JSON.stringify(this.sharedState);
        const uState = JSON.stringify(uniqueState);
        console.log(`Flyweight: shared (${sState}) and unique (${uState}) state`);
    }
}