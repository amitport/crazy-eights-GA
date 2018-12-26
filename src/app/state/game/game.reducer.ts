import { GameActions, GameActionTypes } from './game.actions';

export interface GameState {
  test: boolean;
}

export const initialState: GameState = {
  test: true,
};

export function reducer(state = initialState, action: GameActions): GameState {
  switch (action.type) {

    case GameActionTypes.LoadGames:
      return state;


    default:
      return state;
  }
}
