import { RANKS, SUITS } from '../cards';
import { chooseOne } from '../utils';

type Node2 = any;

interface BinaryOpNode {
  left: Node2;
  Right: Node2;
}

export abstract class Expression {
  abstract evaluate(env: {[key: string]: any}): any;
}

abstract class Op {
  protected static opName: string;
  ['constructor']: typeof Op;
}

class UnaryOp extends Op {
  constructor(public expr: Expression) {
    super();
  }

  toString() {
    return `${this.constructor.opName}(${this.expr.toString()})`;
  }
}

class NotOp extends UnaryOp {
  static readonly type = 'UnaryOp';

  static readonly opName = 'not';

  evaluate(env: {[key: string]: any}) {
    return !this.expr.evaluate(env);
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

  constructor(public expr1: Expression, public expr2: Expression) {
    super();
  }

  toString() {
    return `(${this.expr1.toString()} ${this.constructor.opName} ${this.expr2.toString()})`;
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
  constructor(public value: any) {
    super();
  }

  evaluate(env: {[key: string]: any}) {
    return this.value;
  }

  toString() {
    return this.value.toString();
  }
}

class Constant extends Terminal {
  constructor(public value: any) {
    super();
  }

  evaluate(env: {[key: string]: any}) {
    return this.value;
  }

  toString() {
    return this.value.name;
  }
}

class Variable extends Terminal {
  constructor(public key: any) {
    super();
  }

  evaluate(env: {[key: string]: any}) {
    return env[this.key];
  }

  toString() {
    return this.key;
  }
}

const UNARY_OPS = [IsEmptyOp, NotOp, RankOp, SuitOp, ColorOp];
const BINARY_OPS = [/*AndOp, */OrOp, EqOp, NotEqOp];
const VARIABLES = [new Variable('discardPile'), new Variable('cardToPlay')];
const TERMINALS = [
  new Literal(true), new Literal(false),

  ...VARIABLES,

  ...Object.values(RANKS).map((_) => new Constant(_)),
  ...Object.values(SUITS).map((_) => new Constant(_)),
];

export function randomTree(depth = 0, avoidConstantsAndLiterals = false): Expression {
  // actual solution:
  // return new OrOp(
  //   new IsEmptyOp(VARIABLES[0]),
  //   new OrOp(
  //     new EqOp(new RankOp(VARIABLES[1]), new Constant(RANKS.EIGHT)),
  //     new OrOp(
  //       new EqOp(new RankOp(VARIABLES[0]), new RankOp(VARIABLES[1])),
  //       new EqOp(new SuitOp(VARIABLES[0]), new SuitOp(VARIABLES[1])),
  //     )
  //   ),
  // );

  // random tree below:
  if (Math.random() < 0.1 * (1 + depth / 5000)) {
    return avoidConstantsAndLiterals ? chooseOne(VARIABLES) : chooseOne(TERMINALS);
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
      return new node(randomTree(nextDepth, true), randomTree(nextDepth));
    }
  }
}

