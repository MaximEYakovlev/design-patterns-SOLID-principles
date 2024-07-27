abstract class Component {
    protected parent: Component | null = null;

    public setParent(parent: Component | null) {
        this.parent = parent;
    }

    public getParent(): Component | null {
        return this.parent;
    }

    public add(component: Component): void { }
    public remove(component: Component): void { }

    public isComposite(): boolean {
        return false;
    }

    public abstract operation(): string;
}

class Leaf extends Component {
    public operation(): string {
        return 'leaf';
    }
}

class Composite extends Component {
    protected children: Component[] = [];

    public add(component: Component): void {
        this.children.push(component);
        component.setParent(this);
    }

    public remove(component: Component): void {
        const index = this.children.indexOf(component);

        if (index !== -1) {
            this.children.splice(index, 1);
            component.setParent(null);
        }
    }

    public isComposite(): boolean {
        return true;
    }

    public operation(): string {
        const result: string[] = this.children.map(child => child.operation());

        return `branch(${result.join('+')})`;
    }
}

// client code
const clientA = (component: Component): void => {
    console.log(`result: ${component.operation()}`);
}

const clientB = (composite: Component, simple: Component): void => {
    if (composite.isComposite()) {
        composite.add(simple);
    }

    console.log(`result: ${composite.operation()}`);
}

const tree = new Composite();
const branchOne = new Composite();
const branchTwo = new Composite();
const leaf = new Leaf();

tree.add(branchOne);
tree.add(branchTwo);
branchOne.add(leaf);
branchOne.add(leaf);
branchTwo.add(leaf);

clientA(leaf);
clientA(tree);
clientB(tree, leaf);