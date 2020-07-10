import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class InterviewService extends DataService {

  constructor(http: HttpClient) { 
    let url = 'http://localhost:8080/interviews/'; 
    super(url, http);
  }
}
