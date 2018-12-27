import { GameActions, GameActionTypes } from './game.actions';
import { DECK, Face } from '../../cards';
import { shuffle } from '../../utils';

export interface GameState {
  player: ReadonlyArray<Face>;
  opp: ReadonlyArray<Face>;
  discard: ReadonlyArray<Face>;
  stock: ReadonlyArray<Face>;
}

export const initialState: GameState = {
  player: [],
  opp: [],
  discard: [],
  stock: [],
};

export function reducer(state = initialState, action: GameActions): GameState {
  switch (action.type) {

    case GameActionTypes.Start:
      const shuffled = shuffle(DECK);
      const [player, opp, discard, stock] = [
        Object.freeze(shuffled.slice(0, 7)),
        Object.freeze(shuffled.slice(7, 14)),
        Object.freeze([shuffled[14]]),
        Object.freeze(shuffled.slice(15))
      ];
      return {
        player, opp, discard, stock
      };
    default:
      return state;
  }
}
