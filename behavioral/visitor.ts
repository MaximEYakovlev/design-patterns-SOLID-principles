interface IComponent {
  accept(visitor: IVisitor): void;
}

interface IVisitor {
  visitComponentA(element: ComponentA): void;
  visitComponentB(element: ComponentB): void;
}

class ComponentA implements IComponent {
  public accept(visitor: IVisitor): void {
    visitor.visitComponentA(this);
  }

  public componentAMethod(): string {
    return 'A';
  }
}

class ComponentB implements IComponent {
  public accept(visitor: IVisitor): void {
    visitor.visitComponentB(this);
  }

  public componentBMethod(): string {
    return 'B';
  }
}

class VisitorOne implements IVisitor {
  visitComponentA(element: ComponentA): void {
    console.log(`${element.componentAMethod()} + VisitorOne`);
  }

  visitComponentB(element: ComponentB): void {
    console.log(`${element.componentBMethod()} + VisitorOne`);
  }
}

class VisitorTwo implements IVisitor {
  visitComponentA(element: ComponentA): void {
    console.log(`${element.componentAMethod()} + VisitorTwo`);
  }

  visitComponentB(element: ComponentB): void {
    console.log(`${element.componentBMethod()} + VisitorTwo`);
  }
}

// client code
const componentA = new ComponentA();
const componentB = new ComponentB();
const visitorOne = new VisitorOne();
const visitorTwo = new VisitorTwo();

const components = [componentA, componentB];

const clientCode = (components: IComponent[], visitor: IVisitor) => {
  components.forEach(component => component.accept(visitor));
}

clientCode(components, visitorOne);
clientCode(components, visitorTwo);
