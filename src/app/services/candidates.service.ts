import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  constructor() { }

  save(candidate, cv : File) {
    console.log("called save for candidate " + JSON.stringify(candidate) + "\n" + cv);
  }
}
