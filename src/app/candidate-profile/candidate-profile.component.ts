import { MatSnackBar } from '@angular/material/snack-bar';
import { CandidateProfileService } from './../services/candidate-profile.service';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { INTERVIEW_PERMISSION } from '../services/guards/permissions';
import { AuthService } from '../services/auth.service';


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
  responsePending : boolean = false;
  canScheduleInterview : boolean;
  candidateId;

  constructor(private route: ActivatedRoute, private router : Router,
    private authService : AuthService, private candidateProfileService : CandidateProfileService, 
    private snackBar : MatSnackBar, 
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, @Optional() public dialogRef: MatDialogRef<CandidateProfileComponent>){
  }

  ngOnInit(): void {
    this.dataLoading = true;
    let user = this.authService.userLoggedIn();
    this.canScheduleInterview = INTERVIEW_PERMISSION.create.includes(user.role.roleString);
    this.candidateId = this.route.snapshot.paramMap.get("id");
    if(this.data !== null) {
      this.candidateId = this.data; 
    }
    this.candidateProfileService.getById(this.candidateId).subscribe((candidate : any) => {
      this.candidate = candidate;
      this.status = candidate.status;
      this.interviews = this.candidate.interviews;
      this.columnHeader = {roundNum : 'Round', startTime : 'Start Time', endTime : 'End Time', feedback : 'Feedback'};
      this.dataLoading = false;
    }, err => {
      this.dataLoading = false;
      this.snackBar.open("Could not fetch candidate data", "Dismiss", { duration : 2000 });
    });
  }

  async hireCandidate(){
    this.responsePending = true;
    let response : any = await this.candidateProfileService.hireCandidate(this.candidateId);
    this.responsePending = false;
    if(response.code === 200){
      this.snackBar.open("Candidate Hired", "Dismiss", { duration : 2000 });
      this.status = 'hired';
    } else this.handleErrors(response);
  }

  async rejectCandidate(){
    this.responsePending = true;
    let response : any = await this.candidateProfileService.rejectCandidate(this.candidateId);
    this.responsePending = false;
    if(response.code === 200){
      this.snackBar.open("Candidate Rejected", "Dismiss", { duration : 2000 });
      this.status = 'rejected';
    } else this.handleErrors(response);
  }

  async downloadCV(){
    this.responsePending = true;
    let response : any = await this.candidateProfileService.downloadCV(this.candidateId);
    this.responsePending = false;
    if(response.code === 200)
      saveAs(response.cvFile, (this.candidate?.firstName || '') + "_CV");
    else if(response.code === 404)
      this.snackBar.open("Cannot find CV", "Dismiss", { duration : 2000 });
    else if(response.code === 415)
      this.snackBar.open("Cannot read CV", "Dismiss", { duration : 2000 });
    else
      this.snackBar.open("Something went wrong", "Dismiss", { duration : 2000 });  
  }

  handleErrors(response) {
    if(response.code === 404) 
      this.snackBar.open("Cannot find candidate", "Dismiss", { duration : 2000 });
    else 
      this.snackBar.open("Something went wrong", "Dismiss", { duration : 2000 });
  }

  closeDialog(){
    this.dialogRef.close({event: 'Cancel'});
  }

}
