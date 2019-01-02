import {DECK, EIGHT} from "./cards";
import {chooseOne} from "./utils";

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
    cardToPlay.rank === discardPile.rank || cardToPlay.suit === discardPile.suit

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
