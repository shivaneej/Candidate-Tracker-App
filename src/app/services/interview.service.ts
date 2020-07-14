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

  updateInterview(data, choice : number) {
    let url = 'http://localhost:8080/interviews/';
    switch(choice) {
      case 1: //reschedule
        url += 'reschedule';
        break;
      case 2: //feedback
        url += 'feedback';
        break;
    }
    return new Promise((resolve, reject) => {
      // PUT request to server
      this.http.put<any>(url, data).toPromise().then((response) => {
        resolve({ code : 200 , body : response });
      }).catch((error) => {
        resolve({ code : error.status, error : error.error});
      });
    });
  }

  accept(id) {
    let url = 'http://localhost:8080/interviews/approve/' + id;
    return new Promise((resolve, reject) => {
      // PUT request to server
      this.http.put<any>(url, {}).toPromise().then((response) => {
        resolve({ code : 200 , body : response });
      }).catch((error) => {
        resolve({ code : error.status, error : error.error});
      });
    });
  }
}
