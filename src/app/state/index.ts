import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { GameState } from './game/game.reducer';


export interface State {
  game: GameState;
}

export const gameFeatureSelector = createFeatureSelector<State, GameState>('game');

export const reducers: ActionReducerMap<State> = {game: () => ({test: true})};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];
