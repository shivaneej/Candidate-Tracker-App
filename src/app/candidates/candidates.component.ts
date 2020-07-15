import { CandidatesService } from './../services/candidates.service';
import { Component, OnInit } from '@angular/core';
import { Candidate } from '../models/candidate';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  candidates : Candidate[];
  dataLoading : boolean = false;
  columnHeader = {'name': 'Name', 'email': 'Email', 'round' : 'Round', 'status' : 'Status', 'preferredLoc' : 'Preferred Location'};
  fields = {'name': 'Name', 'email': 'Email', 'round' : 'Round', 'preferredLoc' : 'Preferred Location', 'skills' : 'Skills'};
  dropdownOptions = ['Ready', 'Hold', 'Hired', 'Rejected'];
  ddFilterColumn = 'status';

  constructor(private candidatesService : CandidatesService) {

  }

  ngOnInit(): void {
    this.dataLoading = true;
    this.candidatesService.getAll().pipe(
      map((candidates : any) => {
        console.log(candidates);
        return candidates.map(candidate => {
          return new Candidate(candidate.id, candidate.firstName + " " + candidate.lastName, candidate.email,
          candidate.status, candidate.preferredLoc, candidate.address, candidate.ectc, candidate.ctct, 
          candidate.contact, candidate.currentRound , candidate.skillSet);
        })
      })
    ).subscribe((candidates) =>{
      this.candidates = candidates;
      this.dataLoading = false;
    });
  }
}
