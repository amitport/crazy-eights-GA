import {CARDS, DiscardPile, EIGHT} from "./cards";
import {chooseOne} from "./utils";
// @ts-ignore
import * as Genetic from "genetic-js-no-ww";
import {crossover, mutate} from "./bexpr-evolution-ops";
import {best, randomBooleanExpression} from "./boolean-expression";
import {Expression} from "./expression";

function randomSample() {
    const cardToPlay = chooseOne(CARDS);
    const discardPile = new DiscardPile();

    if (Math.random() < 0.98) {
        // usually we would want a none empty discard pile
        discardPile.push(chooseOne(CARDS))
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

function fitness(this: any, entity: Expression, samples = this.userData.samples) {
    let score = 0;

    for (let sample of samples) {
        const res = entity.evaluate({cardToPlay: sample.cardToPlay, discardPile: sample.discardPile});
        if (typeof res === 'boolean') {
            // (only score boolean results)
            score += sample.playable === res ? 1 : -1;
        }
    }

    score /= samples.length;
    if (score < 0) {
        score = (-score) - 0.05 // fine for being in the opposite direction (can easily be reversed with NotOp)
    }
    score -= entity.size * 0.000001; // fine for being too big
    // if (score > 1) {
    //     debugger;
    // }
    return score;
}

function evolve() {
    const genetic = Genetic.create();
    genetic.optimize = Genetic.Optimize.Maximize;
    genetic.select1 = Genetic.Select1.Tournament2;
    genetic.select2 = Genetic.Select2.Tournament2;

    Object.assign(genetic,
        {
            seed: randomBooleanExpression,
            mutate,
            crossover,
            fitness,
            generation(pop: any, generation: any, stats: any) {
                return true;
            },
            notification(pop: any, generation: any, stats: any, isDone: any) {
                const value = pop[0].entity;

                console.log(`Generation ${generation}`);
                console.log(`stats.maximum ${stats.maximum}`);
                console.log(`maximum tree size ${Math.max(...pop.map((_: any) => _.entity.size))}`);
                console.log(`Best entity (size = ${value.size}): ${value}`);
            }
        }
    );
    genetic.evolve({
        iterations: 100000,
        size: 10000,
        crossover: 0.3,
        mutation: 0.5,
        skip: 20 /* frequency for notifications */
    }, {
        samples: Array.from(genSamples(1000)),
    });
}

// console.log(fitness(best, Array.from(genSamples(1000))));
evolve();

