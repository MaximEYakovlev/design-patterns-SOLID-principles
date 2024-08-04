interface IFlyweight {
    operation(uniqueState: string[]): void;
}

interface IFlyweightFactory {
    getFlyweight(sharedState: string[]): IFlyweight;
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

class FlyweightFactory implements IFlyweightFactory {
    private flyweights: { [key: string]: IFlyweight } = {};

    constructor(initialFlyweights: string[][]) {
        initialFlyweights.forEach(state => {
            const key = this.getKey(state);
            this.flyweights[key] = new Flyweight(state);
        })
    }

    private getKey(state: string[]): string {
        return state.join('_');
    }

    public getFlyweight(sharedState: string[]): IFlyweight {
        const key = this.getKey(sharedState);

        if (!this.flyweights[key]) {
            console.log('FlyweightFactory: flyweight not found, creating a new one');
            this.flyweights[key] = new Flyweight(sharedState);
        } else {
            console.log('FlyweightFactory: reusing an existing flyweight');
        }

        return this.flyweights[key];
    }
}