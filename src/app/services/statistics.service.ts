import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http : HttpClient) { }

  getCandidatesHired(duration) {
    // duration : { days, start, end }
    // return this.http.get('');

    /* Temporary Data */
    if(duration.days === 7)
      return of({ overall : 12, user : 2 });
    else if(duration.days === 30)
      return of({ overall : 81, user : 20 });
    else // from duration.start to duration.end
      return of({  overall : 12, user : 2 });
  }

  getCandidatesRejected(duration) {
    // duration : { days, start, end }
    // return this.http.get('');

    /* Temporary Data */
    if(duration.days === 7)
      return of({ overall : 30, user : 12 });
    else if(duration.days === 30)
      return of({ overall : 81, user : 40 });
    else // from duration.start to duration.end
      return of({ overall : 12, user : 2 });
  }

  getOffersRoledOut(duration) {
    // duration : { days, start, end }
    // return this.http.get('');

    /* Temporary Data */
    if(duration.days === 7)
      return of({ overall : 12, user : 2 });
    else if(duration.days === 30)
      return of({ duration : 30, overall : 81, user : 20 });
    else // from duration.start to duration.end
      return of({ overall : 12, user : 2 });
  }

  getCandidatesInProcess(duration) {
    // duration : { days, start, end }
    // return this.http.get('');

    /* Temporary Data */
    if(duration.days === 7)
      return of({ overall : 22, user : 9 });
    else if(duration.days === 30)
      return of({ duration : 30, overall : 41, user : 20 });
    else // from duration.start to duration.end
      return of({ overall : 12, user : 2 });
  }
}
