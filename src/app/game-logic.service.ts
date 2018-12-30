import { Injectable, OnDestroy } from '@angular/core';
import { EIGHT, FaceId, FACES } from './cards';
import { Subject } from 'rxjs';
import { GameState } from './state/game/game.reducer';
import { select, Store } from '@ngrx/store';
import { gameFeatureSelector, State } from './state';
import { takeUntil } from 'rxjs/operators';
import { Discard } from './state/game/game.actions';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService implements OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  private _destroyed = new Subject<void>();

  game?: GameState;

  constructor(private store: Store<State>) {
    store.pipe(select(gameFeatureSelector), takeUntil(this._destroyed)).subscribe((game) => {
      this.game = game;
    });
  }

  isClickable(section: string, fid?: FaceId) {
    if (section === 'player') {
      const face = FACES[fid];
      if (face.rank === EIGHT) {
        return true;
      }
      if (this.game && this.game.discard.length !== 0) {
        const topDiscard = this.game.discard[this.game.discard.length - 1];
        if (topDiscard.rank === face.rank || topDiscard.suit === face.suit) {
          return true;
        }
      }
    }
    if (section === 'discard') {
      return this.game.stock.length !== 0;
    }
  }

  discard(cardIdx: number) {
    this.store.dispatch(new Discard(cardIdx));
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
