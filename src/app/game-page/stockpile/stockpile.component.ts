import { Component, Input, OnDestroy } from '@angular/core';
import { GameLogicService } from '../../game-logic.service';
import { Draw } from '../../state/game/game.actions';
import { Subject } from 'rxjs';
import { GameState } from '../../state/game/game.reducer';
import { select, Store } from '@ngrx/store';
import { gameFeatureSelector, State } from '../../state';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-stockpile',
  templateUrl: './stockpile.component.html',
  styleUrls: ['./stockpile.component.scss']
})
export class StockpileComponent implements OnDestroy {
  @Input() size?: number;

  /** Subject that emits when the component has been destroyed. */
  private _destroyed = new Subject<void>();

  game?: GameState;

  constructor(private store: Store<State>, private logic: GameLogicService) {
    store.pipe(select(gameFeatureSelector), takeUntil(this._destroyed)).subscribe((game) => {
      this.game = game;
    });
  }

  isClickable() {
    return this.logic.isClickable('discard');
  }

  draw() {
    this.store.dispatch(new Draw());
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
