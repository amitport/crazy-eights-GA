import * as Genetic from 'genetic-js';
import { randomTree, TERMINALS, UnaryOp } from './ast/tree';
import { chooseOne } from './utils';

const genetic = Genetic.create();
genetic.optimize = Genetic.Optimize.Maximize;
genetic.select1 = Genetic.Select1.Tournament2;
genetic.select2 = Genetic.Select2.Tournament2;

genetic.seed = randomTree;

function stripUnary(entity: UnaryOp) {
  return entity.expr;
}

function mutate(entity) {
  if (entity.type === 'UnaryOp' && Math.random() < 0.1) {
    return entity.expr;
  }
  if (entity.type === 'BinaryOp' && Math.random() < 0.1) {
    return (Math.random() < 0.5)
      ? new entity.constructor(mutate(entity.expr1), entity.expr2)
      : new entity.constructor(entity.expr1, mutate(entity.expr2));
  }
  if (entity.type === 'Terminal' && Math.random() < 0.1) {
    return chooseOne(TERMINALS);
  }
  return entity;
}

genetic.mutate = mutate;


genetic.crossover = function (parent1, parent2) {
  const index1 = Math.floor(Math.random() * parent1.length);
  const index2 = Math.floor(Math.random() * parent2.length);

  const subtree1 = this.userData.manager.subtreePrefix(parent1, index1).expression;
  const subtree2 = this.userData.manager.subtreePrefix(parent2, index2).expression;

  // Copy subtree2 to parent1 at index1.
  let child1 = this.userData.manager.replaceAtIndex(parent1, index1, subtree1, subtree2);
  // Copy subtree1 to parent2 at index2.
  let child2 = this.userData.manager.replaceAtIndex(parent2, index2, subtree2, subtree1);

  if (child1.length > this.userData.maxLength) {
    child1 = parent1;
  }

  if (child2.length > this.userData.maxLength) {
    child2 = parent2;
  }

  return [child1, child2];
};

genetic.fitness = function (entity) {
  let fitness = 0;
  let solution = this.userData.solution;

  if (this.userData.testCases) {
    // For each test case, subtract a penalty from a total of 100 for any deviation in the evaluation from the target value.
    return this.userData.testCases.map(testCase => {
      const target = this.userData.manager.evaluatePrefix(this.userData.solution, testCase);
      const actual = this.userData.manager.evaluatePrefix(entity, testCase);

      // Give 100 points for each test case, minus any deviation in the evaluated value.
      return (100 - Math.abs(target - actual));
    }).reduce((total, x) => {
      return total + x;
    });
  }
  else {
    fitness = this.userData.manager.evaluatePrefix(entity);
    return solution - Math.abs(solution - fitness);
  }
};

genetic.generation = function (pop, generation, stats) {
  // If using test cases, give 100 points for each test case. Otherwise, just use the value of the evaluation.
  let solution = (this.userData.testCases && this.userData.testCases.length * 100) || this.userData.solution;
  return pop[0].fitness !== solution;
};

genetic.notification = function (pop, generation, stats, isDone) {
  const value = pop[0].entity;

  console.log(`Generation ${generation}, Best Fitness ${stats.maximum}, Best genome: ${value}`);

  if (isDone) {
    if (this.userData.testCases) {
      this.userData.testCases.forEach(testCase => {
        const result = this.userData.manager.evaluatePrefix(value, testCase);
        console.log(testCase);
        console.log(`Result: ${result}`);
      });
    } else {
      console.log(`Result: ${this.userData.manager.evaluatePrefix(value)}`);
    }
  }
};

genetic.evolve({
  iterations: 100000,
  size: 100,
  crossover: 0.3,
  mutation: 0.3,
  skip: 50 /* frequency for notifications */
}, {
  // solution: '**xxx', // The function for the GA to learn.
  // testCases: [ {x: 1 }, {x: 3}, {x: 5}, {x: 9}, {x: 10} ], // Test cases to learn from.
  // maxTreeDepth: 25,
  // maxLength: 100,
  // manager: utilityManager
});
