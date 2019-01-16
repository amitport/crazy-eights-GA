// @ts-ignore
import * as Genetic from "genetic-js-no-ww";


import {mutate1, mutate2} from "./mutate";
import {fitness1, fitness2} from "./fitness";
import {genSamplesArray, getRandomExpression} from "./random";
import {crossover} from "./crossover";

const param1 = {
    seed: getRandomExpression,
    mutate: mutate1,
    crossover: crossover,
    fitness: fitness1,
};

const param2 = {
    seed: getRandomExpression,
    mutate: mutate2,
    crossover: crossover,
    fitness: fitness2,
};

const param = {
    seed: getRandomExpression,
    mutate: mutate2,
    crossover: crossover,
    fitness: fitness1,
};

function evolve() {
    const genetic = Genetic.create();
    genetic.optimize = Genetic.Optimize.Maximize;
    genetic.select1 = Genetic.Select1.Tournament2;
    genetic.select2 = Genetic.Select2.Tournament2;

    Object.assign(genetic,
        {
            seed: param.seed,
            mutate: param.mutate,
            crossover:  param.crossover,
            fitness: param.fitness,
            // generation(pop: any, generation: any, stats: any) {
            //     return true;
            // },
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
        size: 1000,
        crossover: 0.3,
        mutation: 0.5,
        skip: 20 /* frequency for notifications */
    }, {
        samples: genSamplesArray(1000),
    });
}

evolve();

