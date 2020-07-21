import { MatSnackBar } from '@angular/material/snack-bar';
import { CandidateProfileService } from './../services/candidate-profile.service';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { CANDIDATE_PERMISSION, INTERVIEW_PERMISSION } from '../services/guards/permissions';
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

  canScheduleInterview : boolean;

  candidateId;
  constructor(private route: ActivatedRoute, private router : Router,
    private authService : AuthService,
    private candidateProfileService : CandidateProfileService, private snackBar : MatSnackBar, 
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, @Optional() public dialogRef: MatDialogRef<CandidateProfileComponent>,){
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
    });
  }

  async hireCandidate(){
    let response : any = await this.candidateProfileService.hireCandidate(this.candidateId)
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

  async downloadCV(){
    let response : any = await this.candidateProfileService.downloadCV(this.candidateId)
    if(response.code === 200){
      saveAs(response.cvFile, this.candidate.firstName + "_CV");
    }else if(response.code === 404){
      this.snackBar.open("CV not found", "Dismiss", {
        duration : 3000
      });
    }else{
      this.snackBar.open("Something went wrong", "Dismiss", {
        duration : 3000
      });
    }
    
  }

  closeDialog(){
    this.dialogRef.close({event: 'Cancel'});
  }

}
