import { ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { GameState, reducer } from './game/game.reducer';


export interface State {
  game: GameState;
}

export const gameFeatureSelector = createFeatureSelector<State, GameState>('game');

export const reducers: ActionReducerMap<State> = {game: reducer};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];
