import {CARDS, DiscardPile, RANKS, SUITS} from './cards';
import { Expression } from './expression';
import { chooseOne } from './utils';
import * as util from 'util';
// @ts-ignore
import histogram from "ascii-histogram";

export class Literal extends Expression {
    static readonly arity = 0;

    constructor(public value: any) {
        super();
    }

    evaluate(env: { [key: string]: any }) {
        return this.value;
    }

    toString() {
        return this.value.hasOwnProperty('id') ? this.value.id : this.value.toString();
    }

    [util.inspect.custom]() {
        return `Literal[${this.value.toString()}]`;
    }

    clone() {
        return new Literal(this.value);
    }
}

const LITERALS = [
    ...RANKS.map((_) => new Literal(_)),
    ...SUITS.map((_) => new Literal(_)),
    // ...CARDS.map((_) => new Literal(_)),
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

export class RankOp extends AccessorOp {
    static readonly opName = 'rank';
}

export class SuitOp extends AccessorOp {
    static readonly opName = 'suit';
}

class ColorOp extends AccessorOp {
    static readonly opName = 'color';
}

const ACCESSORS = [RankOp, SuitOp, ColorOp];

// predicates
export class IsEmptyOp extends Expression {
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
export class EqOp extends Expression {
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

export function randomClause(): Expression {
    if (Math.random() < 0.01) {
        const v = chooseOne(VARIABLES);
        return new (chooseOne(PREDICATES))([v]);
    } else { // if (Op.arity === 2)
        const SOp1 = Math.random() < 0.9 ? chooseOne([...ACCESSORS]) : null;
        const SOp2 = Math.random() < 0.9 ? chooseOne([...PREDICATES, ...ACCESSORS]) : null;

        const v1 = SOp1 != null ? new SOp1([chooseOne(VARIABLES)]) : chooseOne(VARIABLES);
        const v2 = SOp2 != null ? new SOp2([chooseOne([...VARIABLES, ...LITERALS])]) : chooseOne([...VARIABLES, ...LITERALS]);

        return new (chooseOne(COMPARISONS))([v1, v2]);
    }
}

function histogramTest() {
    // used to view how the histogram of the tree size looks
    const obj: { [key: string]: number } = {};
    for (let i = 0; i < 100000; i++) {
        const r = randomClause();
        const c =  r.toString();

        // if (c === '(cardToPlay.suit = discardPile.suit)') {
        //
        //     let j = 0;
        //     for (; j < 100; j++) {
        //         const sIdx = Math.floor(Math.random() * 4);
        //         const idx1 = Math.floor(Math.random() * 13) + 13 * sIdx;
        //         const idx2 = Math.floor(Math.random() * 13) + 13 * sIdx;
        //         // console.log(CARDS.map((v, idx) => ({idx, id: v.id})), `${CARDS[idx1].id} T ${CARDS[idx2].id}`);
        //         if (CARDS[idx1].suit !== CARDS[idx2].suit) {
        //             debugger;
        //         }
        //         if (r.evaluate({cardToPlay: CARDS[idx1], discardPile: CARDS[idx2]}) !== true) {
        //             break;
        //         }
        //     }
        //     const l = j + 100;
        //     for (; j < l; j++) {
        //         const sIdx = Math.floor(Math.random() * 4);
        //         const idx1 = Math.floor(Math.random() * 13) + 13 * sIdx;
        //         const idx2 = Math.floor(Math.random() * 13) + 13 * ((sIdx + 1) % 4);
        //         console.log(`${CARDS[idx1].id} F ${CARDS[idx2].id}`);
        //         if (CARDS[idx1].suit === CARDS[idx2].suit) {
        //             debugger;
        //         }
        //         if (r.evaluate({cardToPlay: CARDS[idx1], discardPile: CARDS[idx2]}) === true) {
        //             break;
        //         }
        //     }
        //
        //     if (j == 200) {
        //         debugger;
        //     }
        // }

        if (obj.hasOwnProperty(c)) {
            obj[c]++;
        } else {
            obj[c] = 1;
        }
    }
    console.log(histogram(obj));
}

// histogramTest();