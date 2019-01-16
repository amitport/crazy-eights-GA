import {ColorOp, EqOp, IsEmptyOp, IsNotEmptyOp, Literal, NotEqOp, RankOp, SuitOp, Variable} from "./clause";
import {RANKS, SUITS} from "./cards";
import {AndOp, NotOp, OrOp} from "./boolean-expression";

export const UNARY_OPS = [IsEmptyOp, IsNotEmptyOp , RankOp, SuitOp, ColorOp, NotOp];
export const BINARY_OPS = [EqOp, NotEqOp, AndOp, OrOp];

export const VARIABLES = [new Variable('discardPile'), new Variable('cardToPlay')];

export const LITERALS = [
    new Literal(true), new Literal(false), // todo do we need this?

    ...RANKS.map((_) => new Literal(_)),
    ...SUITS.map((_) => new Literal(_)),
    // ...CARDS.map((_) => new Literal(_)),
];

export const TERMINALS = [
    ...VARIABLES,
    ...LITERALS,
];

export const BOOLEAN_OPS = [AndOp, NotOp, OrOp];
export const ACCESSORS = [RankOp, SuitOp, ColorOp];
export const PREDICATES = [IsEmptyOp, IsNotEmptyOp];
export const COMPARISONS = [EqOp, NotEqOp];

