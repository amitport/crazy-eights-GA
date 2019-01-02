import { chooseOne } from './utils';
import {Tree} from "./tree";
import {RANKS, SUITS} from "./cards";

// todo make this a tree
export abstract class Expression extends Tree {
  abstract evaluate(env: {[key: string]: any}): any;
}

abstract class Op extends Tree {
  protected static opName: string;
  ['constructor']: typeof Op;
}

export  class UnaryOp extends Op {
  get expr() {return this.children[0] as Expression;}

  constructor(expr: Expression) {
    super(new.target, [expr]);
  }

  toString() {
    return `${this.constructor.opName}(${this.expr})`;
  }

  clone() {
    return new this.content(this.expr.clone());
  }
}

class NotOp extends UnaryOp {
  static readonly type = 'UnaryOp';

  static readonly opName = 'not';

  evaluate(env: {[key: string]: any}) {
    return !this.expr.evaluate(env);
  }

  toString() {
    return `!(${this.expr})`;
  }
}

class IsEmptyOp extends UnaryOp {
  static readonly type = 'UnaryOp';

  static readonly opName = 'isEmpty';

  evaluate(env: {[key: string]: any}) {
    return this.expr.evaluate(env).length === 0;
  }
}

abstract class PropertyOp extends UnaryOp {
  static readonly type = 'PropertyOp';

  evaluate(env: {[key: string]: any}) {
    return this.expr.evaluate(env)[this.constructor.opName];
  }

  toString() {
    return `${this.expr}.${this.constructor.opName}`;
  }
}

class RankOp extends PropertyOp {
  static readonly opName = 'rank';
}

class SuitOp extends PropertyOp {
  static readonly opName = 'suit';
}

class ColorOp extends PropertyOp {
  static readonly opName = 'color';
}


class BinaryOp extends Op {
  static readonly type = 'BinaryOp';

  get expr1() {return this.children[0] as Expression;}
  get expr2() {return this.children[1] as Expression;}

  constructor(expr1: Expression, expr2: Expression) {
    super(new.target, [expr1, expr2]);
  }

  toString() {
    return `(${this.expr1} ${this.constructor.opName} ${this.expr2})`;
  }

  clone() {
    return new this.content(this.expr1.clone(), this.expr2.clone());
  }
}

class AndOp extends BinaryOp {
  static readonly opName = 'and';

  evaluate(env: {[key: string]: any}) {
    return this.expr1.evaluate(env) && this.expr2.evaluate(env);
  }
}

class OrOp extends BinaryOp {
  static readonly opName = 'or';

  evaluate(env: {[key: string]: any}) {
    return this.expr1.evaluate(env) || this.expr2.evaluate(env);
  }
}

class EqOp extends BinaryOp {
  static readonly opName = '==';

  evaluate(env: {[key: string]: any}) {
    return this.expr1.evaluate(env) === this.expr2.evaluate(env);
  }
}

class NotEqOp extends BinaryOp {
  static readonly opName = '!=';

  evaluate(env: {[key: string]: any}) {
    return this.expr1.evaluate(env) !== this.expr2.evaluate(env);
  }
}

abstract class Terminal extends Expression {
  readonly type = 'Terminal';
}

class Literal extends Terminal {

  get value() {return this.content;}

  constructor(value: any) {
    super(value);
  }

  evaluate(env: {[key: string]: any}) {
    return this.value;
  }

  toString() {
    return this.value.toString();
  }

  clone() {
    return new Literal(this.value);
  }
}

export class Constant extends Terminal {
  get value() {return this.content;}

  constructor(value: any) {
    super(value);
  }

  evaluate(env: {[key: string]: any}) {
    return this.value;
  }

  toString() {
    return this.value.name;
  }

  clone() {
    return new Constant(this.value);
  }
}

class Variable extends Terminal {
  get key() {return this.content;}

  constructor(key: any) {
    super(key);
  }

  evaluate(env: {[key: string]: any}) {
    return env[this.key];
  }

  toString() {
    return this.key;
  }

  clone() {
    return new Variable(this.key);
  }
}

const UNARY_OPS = [IsEmptyOp, NotOp, RankOp, SuitOp, ColorOp];
const BINARY_OPS = [/*AndOp, */OrOp, EqOp, NotEqOp];
const VARIABLES = [new Variable('discardPile'), new Variable('cardToPlay')];
const CONSTANTS = [
  ...RANKS.map((_) => new Constant(_)),
  ...SUITS.map((_) => new Constant(_)),
];
export const TERMINALS = [
  new Literal(true), new Literal(false),

  ...VARIABLES,
  ...CONSTANTS,
];

export function randomTree(depth = 0): Expression {
  // actual solution:
  // return new OrOp(
  //   new IsEmptyOp(VARIABLES[0]),
  //   new OrOp(
  //     new EqOp(new RankOp(VARIABLES[1]), new Constant(EIGHT)),
  //     new OrOp(
  //       new EqOp(new RankOp(VARIABLES[0]), new RankOp(VARIABLES[1])),
  //       new EqOp(new SuitOp(VARIABLES[0]), new SuitOp(VARIABLES[1])),
  //     )
  //   ),
  // );

  // random tree below:
  if (Math.random() < 0.01 * (1 + depth / 5000)) {
    return chooseOne(TERMINALS);
  } else {
    const node = chooseOne([...UNARY_OPS, ...BINARY_OPS]);
    const nextDepth = depth + 1;
    if (node.type === 'UnaryOp') {
      if (node.opName === 'isEmpty') {
        return new node(VARIABLES[0]);
      }
      return new node(randomTree(nextDepth));
    }
    if (node.type === 'PropertyOp') {
      return new node(chooseOne(VARIABLES));
    }
    if (node.type === 'BinaryOp') {
      return new node(randomTree(nextDepth), randomTree(nextDepth));
    }
  }
}

