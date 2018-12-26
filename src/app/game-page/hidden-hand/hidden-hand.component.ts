import { Component, Input, OnInit } from '@angular/core';
import { times } from '../../utils';

@Component({
  selector: 'app-hidden-hand',
  templateUrl: './hidden-hand.component.html',
  styleUrls: ['./hidden-hand.component.scss']
})
export class HiddenHandComponent implements OnInit {
  times = times;

  @Input() size: number;

  constructor() {
  }

  ngOnInit() {
  }

}
