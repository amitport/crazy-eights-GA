import {Expression} from './expression';
import {EqOp, IsEmptyOp, Literal, randomClause, RankOp, SuitOp, Variable} from './clause';
import {chooseOne} from "./utils";
// @ts-ignore
import histogram from "ascii-histogram";
import {EIGHT} from "./cards";


class NotOp extends Expression {
    static readonly arity = 1;

    evaluate(env: { [key: string]: any }) {
        return !this.children[0].evaluate(env);
    }

    toString() {
        return `¬(${this.children[0]})`;
    }
}

export class AndOp extends Expression {
    static readonly arity = 2;

    evaluate(env: { [key: string]: any }) {
        return !!(this.children[0].evaluate(env) && this.children[1].evaluate(env));
    }

    toString() {
        return `(${this.children[0]} ∧ ${this.children[1]})`;
    }
}

export class OrOp extends Expression {
    static readonly arity = 2;

    evaluate(env: { [key: string]: any }) {
        return !!(this.children[0].evaluate(env) || this.children[1].evaluate(env));
    }

    toString() {
        return `(${this.children[0]} ∨ ${this.children[1]})`;
    }
}

export const BOOLEAN_OPS = [NotOp, AndOp, OrOp];

export function randomBooleanExpression(depth = 0): Expression {
    if (Math.random() < 0.15 * (1 + depth / 10)) {
        // clauses are literals as far as the boolean expression is concerned
        return new Literal(randomClause());
    } else {
        const Op = chooseOne(BOOLEAN_OPS)!;
        const nextDepth = depth + 1;
        if (Op.arity === 1) {
            return new Op([randomBooleanExpression(nextDepth)]);
        } else { // if (Op.arity === 2)
            return new Op([randomBooleanExpression(nextDepth), randomBooleanExpression(nextDepth)]);
        }
    }
}

function histogramTest() {
    // used to view how the histogram of the tree size looks
    const obj: { [key: number]: number } = {};
    for (let i = 0; i < 1000; i++) {
        const t = randomBooleanExpression();
        const s = t.size;
        if (obj.hasOwnProperty(s)) {
            obj[s]++;
        } else {
            obj[s] = 1;
        }
    }
    console.log(histogram(obj));
}

export const best = new OrOp([
    new IsEmptyOp([new Variable('discardPile')]),
    new OrOp([
        new EqOp([
            new RankOp([new Variable('discardPile')]),
            new RankOp([new Variable('cardToPlay')])
        ]),
        new OrOp([
            new EqOp([
                new SuitOp([new Variable('discardPile')]),
                new SuitOp([new Variable('cardToPlay')])
            ]),
            new EqOp([
                new RankOp([new Variable('cardToPlay')]),
                new Literal(EIGHT),
            ]),
        ])
    ])
]);