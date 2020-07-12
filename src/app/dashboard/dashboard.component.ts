import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { STATISTICS_PERMISSION, INTERVIEW_PERMISSION } from '../services/guards/permissions';
import { StatisticsService } from '../services/statistics.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { InterviewService } from '../services/interview.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dataListCache = [];
  dataToDisplay;
  interviews;
  objectKeys = Object.keys; 
  user;
  showStatistics;
  showInterviews;
  cardStyles = [
    { title: 'Candidates Hired', color: 'lightblue', icon : 'how_to_reg' },
    { title: 'Candidates Rejected', color: 'lightgreen', icon : 'person_remove' },
    { title: 'Offers Roled Out', color: 'lightpink', icon : 'send' },
    { title: 'Candidates In Process', color: '#DDBDF1', icon : 'event_note' }
  ]
  constructor(
    private authService : AuthService, 
    private statsService : StatisticsService,
    private interviewService : InterviewService ) { }

  ngOnInit(): void {
    this.user = this.authService.userLoggedIn();
    this.showStatistics = STATISTICS_PERMISSION.read.includes(this.user.role.roleString);
    this.showInterviews = INTERVIEW_PERMISSION.read.includes(this.user.role.roleString);
    if(this.showStatistics)
      this.fetchStatistics({ days : 7})
      .subscribe(data => {
        this.dataListCache.push(data);
        this.dataToDisplay = this.dataListCache[0];
      });
    if(this.showInterviews)
      this.interviewService.fetchInterviews().subscribe(interviews => {
        this.interviews = interviews;
        console.log(this.interviews);
      });
  }


  fetchStatistics(duration) {
    return combineLatest(
      this.statsService.getCandidatesHired(duration),
      this.statsService.getCandidatesRejected(duration),
      this.statsService.getOffersRoledOut(duration),
      this.statsService.getCandidatesInProcess(duration),
    ).pipe(
      map(([numHired, numRejected, numOffers, numInProcess]) => {
        return {
          duration : duration.days !== null ? duration.days : { from : duration.start , to : duration.end},
          hired : numHired,
          rejected : numRejected,
          offers : numOffers,
          inProcess : numInProcess
        }
      })
    );
  }
}
