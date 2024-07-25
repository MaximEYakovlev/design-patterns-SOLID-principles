interface IStrategy {
    execute(data: string[]): string[];
}

class Context {
    private strategy: IStrategy;

    constructor(strategy: IStrategy) {
        this.strategy = strategy;
    }

    public setStrategy(strategy: IStrategy) {
        this.strategy = strategy;
    }

    public method(): void {
        const result = this.strategy.execute(['a', 'b', 'c']);
        console.log(result.join(','));
    }
}

class StrategyA implements IStrategy {
    execute(data: string[]) {
        return data.reverse();
    }
}

class StrategyB implements IStrategy {
    execute(data: string[]) {
        return data.sort();
    }
}

// client code
const strategyA = new StrategyA();
const strategyB = new StrategyB();
const context = new Context(strategyA);
context.method();
context.setStrategy(strategyB);
context.method();