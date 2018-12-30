import { Component, Input } from '@angular/core';
import { Face, FaceId } from '../../cards';
import { GameLogicService } from '../../game-logic.service';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent {
  @Input() cards?: Face[];
  @Input() section?: string;

  constructor(private logic: GameLogicService) {
  }

  isClickable(fid: FaceId) {
    // noinspection TsLint
    return this.logic.isClickable(this.section!, fid);
  }

  discard(cardIdx: number) {
    this.logic.discard(cardIdx);
  }
}
