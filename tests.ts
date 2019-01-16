// @ts-ignore
import histogram from "ascii-histogram";
import {getRandomExpression2, randomClause} from "./random";
import {EqOp, IsEmptyOp, Literal, RankOp, SuitOp, Variable} from "./clause";
import {EIGHT} from "./cards";
import {OrOp} from "./boolean-expression";

function clausehistogram() {
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


function expressionSizeHistogram() {
    // used to view how the histogram of the tree size looks
    const obj: { [key: number]: number } = {};
    for (let i = 0; i < 1000; i++) {
        const t = getRandomExpression2();
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