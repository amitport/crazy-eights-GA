// @ts-ignore
import * as Genetic from "genetic-js-no-ww";
// @ts-ignore
import csvWriter from "csv-write-stream";

import {mutate1, mutate2} from "./mutate";
import {fitness1, fitness2} from "./fitness";
import {genSamplesArray, getRandomExpression} from "./random";
import {crossover} from "./crossover";
import * as fs from 'fs';

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

function evolve(writeToCsv: boolean = false) {
    let notification;
    if (writeToCsv) {
        const writer = csvWriter({ headers: ["maximum", "mean", "minimum", "stdev"]});
        writer.pipe(fs.createWriteStream('out.csv'));

        notification = (pop: any, generation: any, stats: any, isDone: any) => {
            writer.write([stats.maximum, stats.mean, stats.minimum, stats.stdev]);

            if (isDone) {
                writer.end();
            }
        }
    } else {
        notification = (pop: any, generation: any, stats: any, isDone: any) => {
            const value = pop[0].entity;

            console.log(`Generation ${generation}`);
            console.log(`stats.maximum ${stats.maximum}`);
            console.log(`maximum tree size ${Math.max(...pop.map((_: any) => _.entity.size))}`);
            console.log(`Best entity (size = ${value.size}): ${value}`);
        }
    }
    const genetic = Genetic.create();
    genetic.optimize = Genetic.Optimize.Maximize;
    genetic.select1 = Genetic.Select1.Tournament2;
    genetic.select2 = Genetic.Select2.OverSelection;

    Object.assign(genetic,
        {
            seed: param.seed,
            mutate: param.mutate,
            crossover:  param.crossover,
            fitness: param.fitness,
            // generation(pop: any, generation: any, stats: any) {
            //     return true;
            // },
            notification,
        }
    );
    genetic.evolve({
        iterations: 500,
        size: 1000,
        crossover: 0.3,
        mutation: 0.3, // doesn't appl after our change to GP
        skip: writeToCsv ? undefined : 20, /* frequency for notifications */
    }, {
        samples: genSamplesArray(1000),
    });
}

evolve(true);

