import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dataList = [
    {
      title: 'Candidates Hired', overall: 23, user : 9, 
      color: 'lightblue', icon : 'how_to_reg'
    },
    {
      title: 'Candidates Rejected', overall: 48, user : 29,
      color: 'lightgreen', icon : 'person_remove'
    },
    {
      title: 'Offers Roled Out', overall: 11, user : 10,
      color: 'lightpink', icon : 'send'
    },
    {
      title: 'Candidates In Process', overall: 15, user : 0,
      color: '#DDBDF1', icon : 'event_note'
    },
  ];

  constructor() { 
  }

  ngOnInit(): void {
  }

}
