import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GameState } from '../state/game/game.reducer';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { gameFeatureSelector, State } from '../state';
import { DECK } from '../cards';
import { Draw, Start } from '../state/game/game.actions';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnDestroy {
  DECK = DECK;
  /** Subject that emits when the component has been destroyed. */
  private _destroyed = new Subject<void>();

  game?: GameState;

  constructor(private store: Store<State>) {
    store.pipe(select(gameFeatureSelector), takeUntil(this._destroyed)).subscribe((game) => {
      this.game = game;
    });
  }

  start() {
    this.store.dispatch(new Start());
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
