import {Expression} from "./expression";
import {CARDS, DiscardPile, EIGHT} from "./cards";
import {
    ACCESSORS,
    BINARY_OPS,
    BOOLEAN_OPS,
    COMPARISONS,
    PREDICATES,
    TERMINALS,
    UNARY_OPS,
    VARIABLES
} from "./node-types";
import {Literal} from "./clause";

export function chooseOne<T>(a: T[] | ReadonlyArray<T>): T | undefined {
    if (a.length !== 0) {
        return a.length === 1 ? a[0] : a[Math.floor(Math.random() * a.length)];
    }
}

export function randomClause(): Expression {
    if (Math.random() < 0.01) {
        const v = chooseOne(VARIABLES)!;
        return new (chooseOne(PREDICATES)!)([v]);
    } else { // if (Op.arity === 2)
        const SOp1 = Math.random() < 0.9 ? chooseOne([...ACCESSORS]) : null;
        const SOp2 = Math.random() < 0.9 ? chooseOne([...PREDICATES, ...ACCESSORS]) : null;

        const v1 = SOp1 != null ? new SOp1([chooseOne(VARIABLES)!]) : chooseOne(VARIABLES)!;
        const v2 = SOp2 != null ? new SOp2([chooseOne(TERMINALS)!]) : chooseOne(TERMINALS)!;

        return new (chooseOne(COMPARISONS)!)([v1, v2]);
    }
}

export function getRandomExpression1(depth = 0): Expression | undefined {
    if (Math.random() < 0.08 * (1 + depth / 5000)) {
        return chooseOne(TERMINALS)!;
    } else {
        const node = chooseOne([...UNARY_OPS,  ...BINARY_OPS])!;
        const nextDepth = depth + 1;
        if (node.type === 'UnaryOp') {
            // @ts-ignore
            if (node.opName === 'isEmpty') {
                return new node([VARIABLES[0]]);
            }
            return new node([getRandomExpression1(nextDepth)!]);
        }
        if (node.type === 'PropertyOp') {
            return new node([chooseOne(VARIABLES)!]);
        }
        if (node.type === 'BinaryOp') {
            return new (node as any)([getRandomExpression1(nextDepth), getRandomExpression1(nextDepth)]);
        }
    }
}

export function getRandomExpression2(depth = 0): Expression {
    if (Math.random() < 0.15 * (1 + depth / 10)) {
        // clauses are literals as far as the boolean expression is concerned
        return new Literal(randomClause());
    } else {
        const Op = chooseOne(BOOLEAN_OPS)!;
        const nextDepth = depth + 1;
        if (Op.arity === 1) {
            return new Op([getRandomExpression2(nextDepth)]);
        } else { // if (Op.arity === 2)
            return new Op([getRandomExpression2(nextDepth), getRandomExpression2(nextDepth)]);
        }
    }
}

export function getRandomTerminal() {
    return chooseOne(TERMINALS)!;
    // return new Literal(randomClause());
}

function randomSample() {
    const cardToPlay = chooseOne(CARDS)!;
    const discardPile = new DiscardPile();

    if (Math.random() < 0.98) {
        // usually we would want a none empty discard pile
        discardPile.push(chooseOne(CARDS)!)
    }

    const playable = discardPile.length === 0 || cardToPlay.rank === EIGHT ||
        cardToPlay.rank === discardPile.rank || cardToPlay.suit === discardPile.suit;

    return {
        cardToPlay,
        discardPile,
        playable,
        toString() {
            return `${cardToPlay.id} --${playable ? '✔' : '❌'}--> [${discardPile.length === 1 ? discardPile[0].id : 'empty'}]\n`
        }
    };
}

export function genSamples(max: number) {
    return {
        [Symbol.iterator]: function* () {
            for (let i = 0; i < max; i++, yield randomSample()) {
            }
        }
    };
}

export function genSamplesArray(max: number) {
    return Array.from(genSamples(1000));
}