import { Component, Input, OnInit } from '@angular/core';
import { Face, FaceId, FACES } from '../../cards';

@Component({
  selector: 'app-discard-pile',
  templateUrl: './discard-pile.component.html',
  styleUrls: ['./discard-pile.component.scss']
})
export class DiscardPileComponent implements OnInit {
  @Input() size = 0;

  face?: Face;

  @Input()
  set topFid(fid: FaceId) {
    this.face = FACES[fid];
  }

  constructor() { }

  ngOnInit() {
  }

}
