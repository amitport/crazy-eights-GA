import { CARDS, RANKS, SUITS } from './cards';
import { Expression } from './expression';
import { chooseOne } from './utils';
import * as util from 'util';

export class Literal extends Expression {
    static readonly arity = 0;

    constructor(public value: { id: string }) {
        super();
    }

    evaluate(env: { [key: string]: any }) {
        return this.value;
    }

    toString() {
        return this.value.id;
    }

    [util.inspect.custom]() {
        return `Literal[${this.value.id}]`;
    }

    clone() {
        return new Literal(this.value);
    }
}

const LITERALS = [
    ...RANKS.map((_) => new Literal(_)),
    ...SUITS.map((_) => new Literal(_)),
    ...CARDS.map((_) => new Literal(_)),
];

export class Variable extends Expression {
    static readonly arity = 0;

    constructor(public key: any) {
        super()
    }

    evaluate(env: { [key: string]: any }) {
        return env[this.key];
    }

    toString() {
        return this.key;
    }

    [util.inspect.custom]() {
        return `Var[${this.key}]`;
    }

    clone() {
        return new Variable(this.key);
    }
}

const VARIABLES = [new Variable('discardPile'), new Variable('cardToPlay')];

// accessors
abstract class AccessorOp extends Expression {
    static readonly arity = 1;
    static readonly opName: string;
    ['constructor']: typeof AccessorOp;

    evaluate(env: { [key: string]: any }) {
        const targetOpt = this.children[0].evaluate(env);
        if (targetOpt) {
            return targetOpt[this.constructor.opName];
        }
    }

    toString() {
        return `${this.children[0]}.${this.constructor.opName}`;
    }
}

class RankOp extends AccessorOp {
    static readonly opName = 'rank';
}

class SuitOp extends AccessorOp {
    static readonly opName = 'suit';
}

class ColorOp extends AccessorOp {
    static readonly opName = 'color';
}

const ACCESSORS = [RankOp, SuitOp, ColorOp];

// predicates
class IsEmptyOp extends Expression {
    static readonly arity = 1;

    evaluate(env: { [key: string]: any }) {
        const arr = this.children[0].evaluate(env);
        if (Array.isArray(arr)) {
            return arr.length === 0;
        }
    }

    toString() {
        return `isEmpty(${this.children[0]})`;
    }
}

class IsNotEmptyOp extends Expression {
    static readonly arity = 1;

    evaluate(env: { [key: string]: any }) {
        const arr = this.children[0].evaluate(env);
        if (Array.isArray(arr)) {
            return arr.length !== 0;
        }
    }

    toString() {
        return `isNotEmpty(${this.children[0]})`;
    }
}

const PREDICATES = [IsEmptyOp, IsNotEmptyOp];

// comparisons
class EqOp extends Expression {
    static readonly arity = 2;

    evaluate(env: { [key: string]: any }) {
        return this.children[0].evaluate(env) === this.children[1].evaluate(env);
    }

    toString() {
        return `(${this.children[0]} = ${this.children[1]})`;
    }
}

class NotEqOp extends Expression {
    static readonly arity = 2;

    evaluate(env: { [key: string]: any }) {
        return this.children[0].evaluate(env) !== this.children[1].evaluate(env);
    }

    toString() {
        return `(${this.children[0]} ≠ ${this.children[1]})`;
    }
}

const COMPARISONS = [EqOp, NotEqOp];

// @ts-ignore
export function randomClause(): Expression {
    const Op = chooseOne([...COMPARISONS, ...PREDICATES]);

    if (Op.arity === 1) {
        const v = chooseOne(VARIABLES);
        return new Op([v]);
    }
    if (Op.arity === 2) {
        const SOp1 = chooseOne([...PREDICATES, ...ACCESSORS, null]);
        const SOp2 = chooseOne([...PREDICATES, ...ACCESSORS, null]);

        const v1 = SOp1 != null ? new SOp1([chooseOne(VARIABLES)]) : chooseOne(VARIABLES);
        const v2 = SOp2 != null ? new SOp2([chooseOne([...VARIABLES, ...LITERALS])]) : chooseOne([...VARIABLES, ...LITERALS]);

        return new Op([v1, v2]);
    }
}
