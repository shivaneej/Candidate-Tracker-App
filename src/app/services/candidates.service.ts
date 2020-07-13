import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService extends DataService{

  constructor(http : HttpClient) {
      let url = "http://localhost:8080/candidates/";
      super(url,http);
   }

  saveCandidate(candidate, cv : File) {
    console.log("called save for candidate " + JSON.stringify(candidate) + "\n" + cv);
  }
}
