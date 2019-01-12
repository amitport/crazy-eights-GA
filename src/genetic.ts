import {DECK, EIGHT} from "./cards";
import {chooseOne} from "./utils";
import * as Genetic from "genetic-js-no-ww";
import {BINARY_OPS, BinaryOp, Expression, randomTree, UnaryOp} from "./ast-tree";
import {chooseRandomSubtree, crossover} from "./tree";

export class DiscardPile extends Array {
  get rank() {
    if (this.length === 1) {
      return this[0].rank;
    }
  }

  get suit() {
    if (this.length === 1) {
      return this[0].suit;
    }
  }

  get color() {
    if (this.length === 1) {
      return this[0].color
    }
  }
}

function randomSample() {
  const cardToPlay = chooseOne(DECK);
  const discardPile = new DiscardPile();

  if (Math.random() < 0.9) {
    // usually we would want a none empty discard pile
    discardPile.push(chooseOne(DECK))
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

function mutate(entity) {
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
      const newChild = chooseOne(oldBranch.children);
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
    const Op = chooseOne([...BINARY_OPS.slice(0, idx), ...BINARY_OPS.slice(idx + 1)]);

    const newOp = new (Op as any)(oldBranch.expr1, oldBranch.expr2);
    if (oldBranch.parent) {
      newOp.parent = oldBranch.parent;
      oldBranch.parent.children.splice(oldBranch.parent.children.indexOf(oldBranch), 1, newOp);
      return newEntity;
    } else {
      return newOp;
    }
  }

  const newBranch = randomTree(40 /* give more chance to terminals */);

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
      mutate: mutate,
      crossover: crossover,
      fitness(entity) {
        let score = 0;

        for (let sample of this.userData.samples) {
          const res = entity.evaluate({cardToPlay: sample.cardToPlay, discardPile: sample.discardPile});
          if (typeof res === 'boolean') {
            // (only score boolean results)
            score += sample.playable === res ? 1 : -1;
          }
        }

        score /= this.userData.samples.length;
        if (score < 0) {
          score = (-score) - 0.05 // fine for being in the opposite direction (can easily be reversed with NotOp
        }
        score -= entity.size * 0.0001; // fine for being too big
        if (score > 1) {
          debugger;
        }
        return score;
      },
      generation(pop, generation, stats) {
        return true;
      },
      notification(pop, generation, stats, isDone) {
        const value = pop[0].entity;

        console.log(`Generation ${generation}`);
        console.log(`stats.maximum ${stats.maximum}`);
        console.log(`maximum tree size ${Math.max(...pop.map(_ => _.entity.size))}`);
        console.log(`Best entity (size = ${value.size}): ${value}`);
      }
    }
  );
  genetic.evolve({
    iterations: 100000,
    size: 800,
    crossover: 0.3,
    mutation: 0.5,
    skip: 50 /* frequency for notifications */
  }, {
    samples: Array.from(genSamples(1000)),
  });
}

evolve();

