import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GameState } from '../state/game/game.reducer';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { gameFeatureSelector, State } from '../state';
import { DECK, Face } from '../cards';
import { Draw, Start } from '../state/game/game.actions';
import { randomTree, Expression } from '../ast/tree';
import { chooseOne, shuffle } from '../utils';

import '../genetic-programming';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnDestroy {
  randomTreeRes: Expression;
  randomHandRes: ReadonlyArray<Face>;
  randomDiscardRes: Face[] = [];

  DECK = DECK;
  /** Subject that emits when the component has been destroyed. */
  private _destroyed = new Subject<void>();

  game?: GameState;

  constructor(private store: Store<State>) {
    store.pipe(select(gameFeatureSelector), takeUntil(this._destroyed)).subscribe((game) => {
      this.game = game;
    });

    this.evaluate = this.evaluate.bind(this);
  }

  randomTree() {
    this.randomTreeRes = randomTree();
  }

  randomDeal() {
    const shuffled = shuffle(DECK);
    this.randomHandRes = Object.freeze(shuffled.slice(0, 37));
    if (Math.random() < 0.9) {
      const topDiscardPile = shuffled[37];
      this.randomDiscardRes = [topDiscardPile];
      // @ts-ignore
      this.randomDiscardRes.rank = topDiscardPile.rank;
      // @ts-ignore
      this.randomDiscardRes.suit = topDiscardPile.suit;
      // @ts-ignore
      this.randomDiscardRes.color = topDiscardPile.color;
    } else {
      this.randomDiscardRes = [];
    }
  }

  evaluate(face: Face) {
    const evaluateRes = this.randomTreeRes.evaluate({discardPile: this.randomDiscardRes, cardToPlay: face});
    console.log(`eval ${face.name}: ` + evaluateRes + ' ' + typeof evaluateRes);
    return typeof evaluateRes === 'boolean' && evaluateRes;
  }

  start() {
    this.store.dispatch(new Start());
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
