import { Action } from '@ngrx/store';

export enum GameActionTypes {
  Start = '[Game] Start game',
  Discard = '[Game] Discard',
  Draw = '[Game] Draw',
}

export class Start implements Action {
  readonly type = GameActionTypes.Start;
}

export class Discard implements Action {
  readonly type = GameActionTypes.Discard;

  constructor(public cardIdx: number) {
  }

}

export class Draw implements Action {
  readonly type = GameActionTypes.Draw;
}

export type GameActions = Start | Discard | Draw;
