import { Component, Input, OnInit } from '@angular/core';
import { Face } from '../../cards';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent implements OnInit {
  @Input() cards: Face[];

  constructor() {
  }

  ngOnInit() {
  }

}
