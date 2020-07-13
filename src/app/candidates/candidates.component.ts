import { CandidatesService } from './../services/candidates.service';
import { Component, OnInit } from '@angular/core';
import { Candidate } from '../models/candidate';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  candidates;
  dataLoading : boolean = false;
  columnHeader = {'firstName': 'Name', 'email': 'Email', 'status' : 'Status'};

  constructor(private candidatesService : CandidatesService) {

  }

  ngOnInit(): void {
    this.dataLoading = true;
    this.candidatesService.getAll().subscribe((candidates) =>{
      console.log(candidates);
      this.candidates = candidates;
      this.dataLoading = false;
    });
  }

}
