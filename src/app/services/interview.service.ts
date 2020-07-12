import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterviewService extends DataService {

  constructor(http: HttpClient) { 
    let url = 'http://localhost:8080/interviews/'; 
    super(url, http);
  }

  // Dummy method
  fetchInterviews() {
    return of([
      { interview_id : 1, candidate_id : 1, interviewer_id : 7,
        date : "22/7/2020", start_time : 	"11:30 AM", end_time : "1:00 PM",
        interviewer_approved : false, recruiter_approved : true },
      { interview_id : 2, candidate_id : 2, interviewer_id : 7,
        date : "22/7/2020", start_time : 	"2:30 PM", end_time : "3:00 PM",
        interviewer_approved : false, recruiter_approved : false },
      { interview_id : 3, candidate_id : 3, interviewer_id : 7,
        date : "23/7/2020", start_time : 	"11:30 AM", end_time : "12:30 PM",
        interviewer_approved : true, recruiter_approved : true },
      { interview_id : 4, candidate_id : 4, interviewer_id : 7,
        date : "23/7/2020", start_time : 	"1:00 PM", end_time : "1:45 PM",
        interviewer_approved : true, recruiter_approved : true },
    ]);
  }
}
