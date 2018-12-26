import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stockpile',
  templateUrl: './stockpile.component.html',
  styleUrls: ['./stockpile.component.scss']
})
export class StockpileComponent implements OnInit {
  @Input() size: number;

  constructor() { }

  ngOnInit() {
  }

}
