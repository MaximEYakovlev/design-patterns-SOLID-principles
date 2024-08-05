interface IFlyweight {
    operation(uniqueState: string): void;
}

interface IFlyweightFactory {
    getFlyweight(sharedState: string[]): IFlyweight;
    listFlyweights(): void;
}

class Flyweight implements IFlyweight {
    private sharedState: string[];

    constructor(sharedState: string[]) {
        this.sharedState = sharedState;
    }

    public operation(uniqueState: string): void {
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

    public listFlyweights(): void {
        const count = Object.keys(this.flyweights).length;

        console.log(`FlyweightFactory: ${count} flyweights:`);

        for (const key in this.flyweights) {
            console.log(key);
        }
    }
}

// client code
const factory = new FlyweightFactory([
    ['GET', 'HTTP/1.1', 'Host: www.example.re'],
    ['POST', 'HTTP/1.1', 'Host: www.example.re'],
    ['PUT', 'HTTP/1.1', 'Host: www.example.re']
]);
factory.listFlyweights();

const addRequest = (
    ff: IFlyweightFactory,
    description: string,
    method: string,
    protocol: string,
    header: string): void => {
    console.log('Client: Adding request');
    const flyweight = ff.getFlyweight([method, protocol, header]);
    flyweight.operation(description);
}

addRequest(factory, 'idempotent: true', 'GET', 'HTTP/1.1', 'Host: www.example.re');
addRequest(factory, 'idempotent: false', 'PATCH', 'HTTP/1.1', 'Host: www.example.re');

factory.listFlyweights();