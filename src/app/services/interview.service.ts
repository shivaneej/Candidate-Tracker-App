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
        start_time : 	"2020-07-22 11:30:00", end_time : "2020-07-22 13:00:00",
        status: 'RECRUITER_APPROVED', feedback : '' },
      { interview_id : 2, candidate_id : 2, interviewer_id : 7,
        start_time : 	"2020-07-22 14:30:00", end_time : "2020-07-22 15:00:00",
        status: 'INTERVIEWER_APPROVED', feedback : '' },
      { interview_id : 3, candidate_id : 3, interviewer_id : 7,
        start_time : 	"2020-07-23 11:30:00", end_time : "2020-07-23 12:30:00",
        status: 'RECRUITER_APPROVED', feedback : '' },
      { interview_id : 4, candidate_id : 4, interviewer_id : 7,
        start_time : 	"2020-07-13 23:00:00", end_time : "2020-07-13 23:45:00",
        status: 'BOTH_APPROVED', feedback : 'Okayish' },
    ]);
  }
}
