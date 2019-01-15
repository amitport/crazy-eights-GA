import {BinaryOp, Expression, UnaryOp} from "./tree";
import {RANKS, SUITS} from "../cards";


class IsEmptyOp extends UnaryOp {
    static readonly type = 'UnaryOp';

    static readonly opName = 'isEmpty';

    evaluate(env: {[key: string]: any}) {
        const listOpt = this.expr.evaluate(env);
        if (listOpt) {
            return this.expr.evaluate(env).length === 0;
        }
    }
}

abstract class PropertyOp extends UnaryOp {
    static readonly type = 'PropertyOp';

    evaluate(env: {[key: string]: any}) {
        const targetOpt = this.expr.evaluate(env);
        if (targetOpt) {
            return targetOpt[this.constructor.opName];
        }
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

export const UNARY_OPS = [IsEmptyOp, RankOp, SuitOp, ColorOp];
export const BINARY_OPS: typeof BinaryOp[] = [EqOp, NotEqOp];
export const VARIABLES = [new Variable('discardPile'), new Variable('cardToPlay')];
const CONSTANTS = [
    ...RANKS.map((_) => new Constant(_)),
    ...SUITS.map((_) => new Constant(_)),
];
export const TERMINALS = [
    new Literal(true), new Literal(false),

    ...VARIABLES,
    ...CONSTANTS,
];

