import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'statistics-card',
  templateUrl: './statistics-card.component.html',
  styleUrls: ['./statistics-card.component.scss']
})
export class StatisticsCardComponent implements OnInit {

  @Input('stats') stats;
  @Input('title') title;
  @Input('color') color;
  @Input('icon') icon;
  @Input('statsMode') statsMode;
  constructor() { }

  ngOnInit(): void {

  }

}
