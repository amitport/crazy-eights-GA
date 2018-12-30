import { Component, Input, OnInit } from '@angular/core';
import { Face, FaceId, FACES } from '../../cards';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  face?: Face;
  @Input() clickable?: boolean;

  @Input()
  set fid(fid: FaceId) {
    this.face = FACES[fid];
  }

  constructor() {
  }

  ngOnInit() {
  }

}
