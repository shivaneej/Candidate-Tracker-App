import { Component, OnInit } from '@angular/core';
import { Candidate } from '../models/candidate';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  // Temporary data
  candidates : Candidate[] = [
    { id: 1, name: 'Candidate 1', email: 'xyz@abc.com', status: 'Hired' }, 
    { id: 2, name: 'Candidate 2', email: 'xyz@abc.com', status: 'Rejected' }, 
    { id: 3, name: 'Candidate 3', email: 'xyz@abc.com', status: 'On Hold' }, 
    { id: 4, name: 'Candidate 4', email: 'xyz@abc.com', status: 'On Hold' }, 
    { id: 5, name: 'Candidate 5', email: 'xyz@abc.com', status: 'On Hold' } 
  ];
  
  
  columnHeader = {'name': 'Name', 'email': 'Email', 'status' : 'Status'};

  constructor() { }

  ngOnInit(): void {
  }

}
