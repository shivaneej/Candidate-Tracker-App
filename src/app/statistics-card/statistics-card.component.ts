import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'statistics-card',
  templateUrl: './statistics-card.component.html',
  styleUrls: ['./statistics-card.component.scss']
})
export class StatisticsCardComponent {

  @Input('stats') stats;
  @Input('title') title;
  @Input('color') color;
  @Input('icon') icon;
  @Input('statsMode') statsMode;
  constructor() { }
}
