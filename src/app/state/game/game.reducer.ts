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
    case GameActionTypes.Discard:
      const cardToDiscard = state.player[action.cardIdx];

      return {
        ...state,
        discard: [...state.discard, cardToDiscard],
        player: [...state.player.slice(0, action.cardIdx), ...state.player.slice(action.cardIdx + 1)],
      };
    case GameActionTypes.Draw:
      const drawnCard = state.stock[state.stock.length - 1];

      return {
        ...state,
        stock: state.stock.slice(0, state.stock.length - 1),
        player: [...state.player, drawnCard],
      };
    default:
      return state;
  }
}
