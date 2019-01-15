import {chooseOne} from "../utils";
// @ts-ignore
import * as Genetic from "genetic-js-no-ww";
import {CARDS, DiscardPile, EIGHT} from "../cards";
import {BinaryOp, Expression, UnaryOp} from "./tree";
import {chooseRandomSubtree, crossover, randomTree} from "./ast-tree";
import {BINARY_OPS as bops} from "./clause";
import {BOOL_BINARY_OPS} from "./boolean-expression";

const BINARY_OPS = [...BOOL_BINARY_OPS, ...bops];

function randomSample() {
  const cardToPlay = chooseOne(CARDS)!;
  const discardPile = new DiscardPile();

  if (Math.random() < 0.9) {
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

function mutate(entity: any) {
  const newEntity = entity.clone();
  const oldBranch = chooseRandomSubtree(newEntity);

  if (Math.random() < 0.05 && oldBranch instanceof UnaryOp) {
    if (oldBranch.parent) {
      oldBranch.parent.children.splice(oldBranch.parent.children.indexOf(oldBranch), 1, oldBranch.expr);

      oldBranch.expr.parent = oldBranch.parent;

      let newRoot = oldBranch as Expression;
      while (newRoot.parent) {
        newRoot = newRoot.parent as Expression;
        newRoot.size -= 1;
      }
      return newRoot;
    } else {
      oldBranch.expr
    }
  }
  if (Math.random() < 0.2 && oldBranch instanceof BinaryOp) {
    if (Math.random() < 0.3) {
      // replace with one of the children
      const newChild = chooseOne(oldBranch.children)!;
      if (oldBranch.parent) {
        newChild.parent = oldBranch.parent;

        oldBranch.parent.children.splice(oldBranch.parent.children.indexOf(oldBranch), 1, newChild);
        const sizeDelta = newChild.size - oldBranch.size;
        let newRoot = oldBranch as Expression;
        while (newRoot.parent) {
          newRoot = newRoot.parent as Expression;
          newRoot.size += sizeDelta;
        }
        return newEntity;
      } else {
        return newChild;
      }
    }
    // replace with another binary op
    const idx = BINARY_OPS.indexOf(oldBranch.constructor as any as typeof BinaryOp);
    const Op = chooseOne([...BINARY_OPS.slice(0, idx), ...BINARY_OPS.slice(idx + 1)])!;

    const newOp = new (Op as any)(oldBranch.expr1, oldBranch.expr2);
    if (oldBranch.parent) {
      newOp.parent = oldBranch.parent;
      oldBranch.parent.children.splice(oldBranch.parent.children.indexOf(oldBranch), 1, newOp);
      return newEntity;
    } else {
      return newOp;
    }
  }

  const newBranch = randomTree(10 /* give more chance to terminals */)!;

  const parent = oldBranch.parent;
  newBranch.parent = parent;

  if (parent) {
    // replace the children of the old parent
    parent.children.splice(parent.children.indexOf(oldBranch), 1, newBranch);
  }

  // propagate size change and find root;
  const sizeDelta = newBranch.size - oldBranch.size;
  let newRoot = newBranch;
  while (newRoot.parent) {
    newRoot = newRoot.parent as Expression;
    newRoot.size += sizeDelta;
  }
  return newRoot;
}

function evolve() {
  const genetic = Genetic.create();
  genetic.optimize = Genetic.Optimize.Maximize;
  genetic.select1 = Genetic.Select1.Tournament2;
  genetic.select2 = Genetic.Select2.Tournament2;

  Object.assign(genetic,
    {
      seed: randomTree,
      mutate,
      crossover,
      fitness(this: any, entity: any) {
        let score = 0;

        for (let sample of this.userData.samples) {
          score += (entity.evaluate({cardToPlay: sample.cardToPlay, discardPile: sample.discardPile}) === sample.playable) ? 1 : 0;
        }
        if (score / this.userData.samples.length < 0.5) {
          // todo maybe sigmoid?
          score = 0.5 * this.userData.samples.length; // don't give negative predicate a score that is too low
        }
        score -= (entity.size) * 0.5;
        score /= this.userData.samples.length;
        return score;
      },
      generation(pop: any, generation: any, stats: any) {
        return pop[0].fitness !== 1;
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
    size: 1000,
    crossover: 0.3,
    mutation: 0.5,
    skip: 20 /* frequency for notifications */
  }, {
    samples: Array.from(genSamples(1000)),
  });
}

evolve();

