class Cloneable {
  clone() {
    throw new Error('method clone() must be implemented');
  }
}

class Foo extends Cloneable {
  constructor(x, y, meta = null) {
    super();
    this.x = x;
    this.y = y;
    this.meta = meta;
  }

  clone() {
    const clonedMeta = this.meta instanceof Cloneable ? this.meta.clone() : this.meta;
    return new Foo(this.x, this.y, clonedMeta);
  }

  fun(x, y) {
    this.x += x;
    this.y += y;
  }
}

class MetaData extends Cloneable {
  constructor(info, data) {
    super();
    this.info = info;
    this.data = data;
  }

  clone() {
    const clonedData = this.cloneData(this.data);
    return new MetaData(this.info, clonedData);
  }

  cloneData(data) {
    if (Array.isArray(data)) {
      return data.map(item => item instanceof Cloneable ? item.clone() : item);
    } else if (data instanceof Cloneable) {
      return data.clone();
    } else if (typeof data === 'object' && data !== null) {
      return { ...data };
    }
    return data;
  }
}

// use cases
const original = new Foo(10, 20, new MetaData('info', [1, 2, 3]));
const clone = original.clone();
clone.fun(5, 5);

console.log(original.x, original.y);
console.log(clone.x, clone.y);

//
const prototype = new Foo(0, 0, new MetaData('template', [new MetaData('nested', [42])]));
const instance1 = prototype.clone();
const instance2 = prototype.clone();

instance1.fun(10, 10);
instance2.fun(20, 20);

console.log(instance1.x, instance1.y);
console.log(instance2.x, instance2.y);

//
const complexMeta = new MetaData('deep', [new MetaData('level 2', [5, 6])]);
const fooWithComplexMeta = new Foo(3, 7, complexMeta);
const fooClone = fooWithComplexMeta.clone();

fooClone.meta.data[0].data.push(7);

console.log(fooWithComplexMeta.meta.data[0].data);
console.log(fooClone.meta.data[0].data); 
