import { Component, Input, OnInit } from '@angular/core';
import { FaceId } from '../card/card.component';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent implements OnInit {

  @Input() faceIds: FaceId[];

  constructor() {
  }

  ngOnInit() {
  }

}
