'use strict';

class Rect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

const equilateral = Category => class extends Category {
  constructor(x, y, side) {
    super(x, y, side, side);
  }
};

const serializable = Category => class extends Category {
  toString() {
    return `[${this.x}, ${this.y}, ${this.width}, ${this.height}]`;
  }
};

const measurable = Category => class extends Category {
  area() {
    return this.width * this.height;
  }
};

const movable = Category => class extends Category {
  move(x, y) {
    this.x += x;
    this.y += y;
  }
};

const scalable = Category => class extends Category {
  scale(k) {
    const x = this.width * k / 2;
    const y = this.height * k / 2;
    this.width += x;
    this.height += y;
    this.x -= x;
    this.y -= y;
  }
};

// Utils

const compose = (...fns) => arg => (
  fns.reduce((arg, fn) => fn(arg), arg)
);

// Usage

const Square1 = equilateral(serializable(measurable(
  movable(scalable(Rect))
)));

const toSquare = compose(
  equilateral, serializable, measurable, movable, scalable
);

const Square2 = toSquare(Rect);

const p1 = new Square2(10, 20, 50);
p1.scale(1.2);
p1.move(-10, 5);
console.log(p1.toString());
console.log('Area:', p1.area());
