import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {

  @Input('overall') overall;
  @Input('user') user;
  @Input('title') title;
  @Input('color') color;
  @Input('icon') icon;
  statsMode = 'overall';
  constructor() { }

  ngOnInit(): void {

  }

}
