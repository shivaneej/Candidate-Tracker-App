import { MatSnackBar } from '@angular/material/snack-bar';
import { CandidateProfileService } from './../services/candidate-profile.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.scss']
})
export class CandidateProfileComponent implements OnInit {

  candidate;
  status;
  interviews;
  columnHeader;
  dataLoading : boolean = false;

  candidateId;
  constructor(private route: ActivatedRoute,
    private router : Router,
      private candidateProfileService : CandidateProfileService,
      private snackBar : MatSnackBar){
  }

  ngOnInit(): void {
    this.dataLoading = true;
    this.candidateId = this.route.snapshot.paramMap.get("id");
    this.candidateProfileService.getById(this.candidateId).subscribe((candidate : any) => {
      this.candidate = candidate;
      this.status = candidate.status;
      this.interviews = this.candidate.interviews;
      this.columnHeader = {roundNum : 'Round', startTime : 'Start Time', endTime : 'End Time', feedback : 'Feedback'};
      this.dataLoading = false;
    });
  }

  async hireCandidate(){
    let response : any = await this.candidateProfileService.hireCandidate(this.candidateId)
    console.log(response.code);
    if(response.code === 200){
      this.snackBar.open("Candidate Hired", "Dismiss", {
        duration : 3000
      });
      this.status = 'hired';
    }else{
      this.snackBar.open("Something went wrong", "Dismiss", {
        duration : 3000
      });
    }
  }

  async rejectCandidate(){
    let response : any = await this.candidateProfileService.rejectCandidate(this.candidateId)
    console.log(response.code);
    if(response.code === 200){
      this.snackBar.open("Candidate Rejected", "Dismiss", {
        duration : 3000
      });
      this.status = 'rejected';
    }else{
      this.snackBar.open("Something went wrong", "Dismiss", {
        duration : 3000
      });
    }
  }

}
