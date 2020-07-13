import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateProfileService extends DataService{


  constructor(http : HttpClient) {
      let url = "http://localhost:8080/candidates/";
      super(url,http);
   }

  hireCandidate(candidateId : number){
    return new Promise((resolve, reject) => {
      let url = 'http://localhost:8080/candidates/hire/' + candidateId;

      this.http.put<any>(url, null).toPromise().then((response) => {
        resolve({code : 200});
      }).catch(error => {
        resolve({code : error.status, error : error.error});
      });
    });
  }

  rejectCandidate(candidateId : number){
    return new Promise((resolve, reject) => {
      let url = 'http://localhost:8080/candidates/reject/' + candidateId;

      this.http.put<any>(url, null).toPromise().then((response) => {
        resolve({code : 200});
      }).catch(error => {
        resolve({code : error.status, error : error.error});
      });
    });
  }

}
