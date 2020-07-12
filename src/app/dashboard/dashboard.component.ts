import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { VIEW_STATISTICS } from '../services/guards/permissions';
import { StatisticsService } from '../services/statistics.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dataListCache = [];
  dataToDisplay;
  objectKeys = Object.keys; 
  user;
  showStatistics;
  cardStyles = [
    { title: 'Candidates Hired', color: 'lightblue', icon : 'how_to_reg' },
    { title: 'Candidates Rejected', color: 'lightgreen', icon : 'person_remove' },
    { title: 'Offers Roled Out', color: 'lightpink', icon : 'send' },
    { title: 'Candidates In Process', color: '#DDBDF1', icon : 'event_note' }
  ]
  constructor(
    private authService : AuthService, 
    private statsService : StatisticsService ) { }

  ngOnInit(): void {
    this.user = this.authService.userLoggedIn();
    this.showStatistics = VIEW_STATISTICS.read.includes(this.user.role.roleString);
    this.fetchStatistics({ days : 7})
    .subscribe(data => {
      this.dataListCache.push(data);
      this.dataToDisplay = this.dataListCache[0];
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
