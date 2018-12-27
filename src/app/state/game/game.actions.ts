import { Action } from '@ngrx/store';

export enum GameActionTypes {
  Start = '[Game] Load Games'
}

export class Start implements Action {
  readonly type = GameActionTypes.Start;
}

export type GameActions = Start;
