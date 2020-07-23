import { CandidatesService } from './../services/candidates.service';
import { Component, OnInit } from '@angular/core';
import { Candidate } from '../models/candidate';
import { map } from 'rxjs/operators';
import { CANDIDATE_PERMISSION } from '../services/guards/permissions';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  canCreateNewCandidate : boolean;

  constructor(private candidatesService : CandidatesService, private authService : AuthService, private snackbar : MatSnackBar) {

  }

  ngOnInit(): void {
    this.dataLoading = true;
    let currentUser = this.authService.userLoggedIn();
    this.canCreateNewCandidate = CANDIDATE_PERMISSION.create.includes(currentUser.role.roleString);
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
    }, err => {
      this.dataLoading = false;
      this.snackbar.open("Could not fetch candidates", "Dismiss", { duration : 2000 }); 
    });
  }
}
